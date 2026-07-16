// ======================================================
// ZULA TRAVELS 2026
// CUSTOMER BOOKING SERVICE
// ======================================================

const db = require("../../config/db");

const financialDocumentService =
  require("../financial-documents/financial-document.service");


// ======================================================
// CREATE CUSTOMER BOOKING
// ======================================================

exports.createBooking = async (userId, bookingData) => {

  const connection = await db.getConnection();


  try {

    await connection.beginTransaction();


    const {
      hotel_id,
      room_id,
      check_in,
      check_out
    } = bookingData;



    // =====================================
    // CHECK ROOM
    // =====================================

    const [[room]] = await connection.query(
      `
      SELECT *
      FROM hotel_rooms
      WHERE id = ?
      AND hotel_id = ?
      FOR UPDATE
      `,
      [
        room_id,
        hotel_id
      ]
    );


    if (!room) {

      throw new Error(
        "Selected room does not belong to the selected hotel."
      );

    }


    if (room.available_quantity <= 0) {

      throw new Error(
        "Selected room is fully booked."
      );

    }



    // =====================================
    // CHECK HOTEL
    // =====================================

    const [[hotel]] = await connection.query(
      `
      SELECT
          id,
          vendor_id
      FROM hotels
      WHERE id = ?
      `,
      [
        hotel_id
      ]
    );


    if (!hotel) {

      throw new Error(
        "Hotel not found."
      );

    }



    // =====================================
    // CALCULATE STAY
    // =====================================

    const startDate =
      new Date(check_in);


    const endDate =
      new Date(check_out);



    const nights =
      Math.ceil(
        (
          endDate - startDate
        )
        /
        (1000 * 60 * 60 * 24)
      );



    if (nights <= 0) {

      throw new Error(
        "Invalid booking dates."
      );

    }



    const totalAmount =
      nights * Number(room.price_per_night);



    // =====================================
    // CREATE BOOKING
    // =====================================


    const [bookingResult] =
      await connection.query(
        `
        INSERT INTO bookings
        (
            user_id,
            vendor_id,
            hotel_id,
            room_id,
            booking_date,
            check_in,
            check_out,
            total_amount,
            currency,
            status,
            payment_status
        )

        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            NOW(),
            ?,
            ?,
            ?,
            ?,
            'pending',
            'pending'
        )
        `,
        [

          userId,

          hotel.vendor_id,

          hotel_id,

          room_id,

          check_in,

          check_out,

          totalAmount,

          room.currency

        ]
      );




    const bookingId =
      bookingResult.insertId;



    // =====================================
    // REDUCE ROOM INVENTORY
    // =====================================


    await connection.query(
      `
      UPDATE hotel_rooms
      SET available_quantity =
          available_quantity - 1
      WHERE id = ?
      `,
      [
        room_id
      ]
    );



    // =====================================
    // CREATE FINANCIAL DOCUMENT
    // =====================================


    await financialDocumentService.createDocument(

      connection,

      bookingId,

      null,

      userId,

      "proforma_invoice",

      totalAmount,

      room.currency

    );



    await connection.commit();



    return {

      booking_id: bookingId,

      total_amount: totalAmount,

      currency: room.currency,

      status: "pending"

    };



  } catch (error) {


    await connection.rollback();

    throw error;


  } finally {


    connection.release();


  }


};




// ======================================================
// GET CUSTOMER BOOKINGS
// ======================================================


exports.getCustomerBookings = async (userId) => {


  const [rows] = await db.query(

    `
    SELECT

        b.id,

        b.booking_date,

        b.check_in,

        b.check_out,

        b.status,

        b.payment_status,

        b.total_amount,

        b.currency,

        h.name AS hotel_name,

        hr.room_type


    FROM bookings b


    LEFT JOIN hotels h

        ON b.hotel_id = h.id


    LEFT JOIN hotel_rooms hr

        ON b.room_id = hr.id


    WHERE b.user_id = ?


    ORDER BY b.id DESC

    `,

    [
      userId
    ]

  );


  return rows;


};