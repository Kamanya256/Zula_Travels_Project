const db = require("../../config/db");


// ==========================================
// GET ALL VENDOR BOOKINGS
// ==========================================

exports.getVendorBookings = async (vendorId) => {

  const [rows] = await db.query(
    `
        SELECT

            b.id AS booking_id,

            b.booking_date,
            b.status,
            b.payment_status,

            b.check_in,
            b.check_out,

            b.total_amount,
            b.currency,


            h.id AS hotel_id,
            h.name AS hotel_name,


            hr.id AS room_id,
            hr.room_type,
            hr.capacity,
            hr.price_per_night,


            u.id AS customer_id,
            u.first_name,
            u.last_name,
            u.email,
            u.phone


        FROM bookings b


        LEFT JOIN hotels h
        ON h.id = b.hotel_id


        LEFT JOIN hotel_rooms hr
        ON hr.id = b.room_id


        LEFT JOIN users u
        ON u.id = b.user_id


        WHERE b.vendor_id = ?


        ORDER BY b.id DESC

        `,
    [vendorId]
  );


  return rows;

};





// ==========================================
// GET SINGLE BOOKING DETAILS
// ==========================================

exports.getBookingDetails = async (
  bookingId,
  vendorId
) => {


  const [[booking]] = await db.query(
    `
        SELECT

        b.*,

        h.name AS hotel_name,

        hr.room_type,
        hr.capacity,
        hr.price_per_night,


        u.first_name,
        u.last_name,
        u.email,
        u.phone


        FROM bookings b


        LEFT JOIN hotels h
        ON h.id=b.hotel_id


        LEFT JOIN hotel_rooms hr
        ON hr.id=b.room_id


        LEFT JOIN users u
        ON u.id=b.user_id


        WHERE b.id=?
        AND b.vendor_id=?


        `,
    [
      bookingId,
      vendorId
    ]
  );



  if (!booking) {

    throw new Error(
      "Booking not found"
    );

  }



  const [history] = await db.query(
    `
        SELECT *

        FROM booking_status_history

        WHERE booking_id=?

        ORDER BY id DESC

        `,
    [
      bookingId
    ]
  );


  return {

    booking,

    history

  };


};







// ==========================================
// VENDOR DASHBOARD
// ==========================================

exports.getDashboard = async (vendorId) => {


  const [[stats]] = await db.query(
    `
        SELECT


        COUNT(*) AS total_bookings,


        SUM(
        status='pending'
        ) AS pending_bookings,


        SUM(
        status='confirmed'
        ) AS confirmed_bookings,


        SUM(
        status='completed'
        ) AS completed_bookings,


        SUM(
        status='cancelled'
        ) AS cancelled_bookings,


        SUM(
        payment_status='paid'
        ) AS paid_revenue


        FROM bookings


        WHERE vendor_id=?


        `,
    [
      vendorId
    ]
  );



  return stats;


};






// ==========================================
// UPDATE STATUS
// ==========================================

exports.updateBookingStatus =
  async (
    bookingId,
    vendorId,
    newStatus,
    userId
  ) => {


    const [[booking]] = await db.query(
      `
        SELECT *

        FROM bookings

        WHERE id=?
        AND vendor_id=?

        `,
      [
        bookingId,
        vendorId
      ]
    );



    if (!booking) {

      throw new Error(
        "Booking not found"
      );

    }



    const oldStatus =
      booking.status;



    // BUSINESS RULES


    if (
      newStatus === "checked_in"
      &&
      oldStatus !== "confirmed"
    ) {

      throw new Error(
        "Only confirmed bookings can check in"
      );

    }



    if (
      newStatus === "completed"
      &&
      oldStatus !== "checked_in"
    ) {

      throw new Error(
        "Guest must check in first"
      );

    }




    await db.query(
      `
        UPDATE bookings

        SET status=?

        WHERE id=?

        `,
      [
        newStatus,
        bookingId
      ]
    );





    await db.query(
      `
        INSERT INTO booking_status_history

        (
        booking_id,
        old_status,
        new_status,
        changed_by
        )

        VALUES(?,?,?,?)

        `,
      [
        bookingId,
        oldStatus,
        newStatus,
        userId
      ]
    );



    return {

      booking_id: bookingId,

      old_status: oldStatus,

      new_status: newStatus

    };


  };






// ==========================================
// APPROVE
// ==========================================

exports.approveBooking =
  async (
    bookingId,
    vendorId,
    userId
  ) => {


    return exports.updateBookingStatus(
      bookingId,
      vendorId,
      "confirmed",
      userId
    );


  };






// ==========================================
// REJECT
// ==========================================

exports.rejectBooking =
  async (
    bookingId,
    vendorId,
    userId
  ) => {


    return exports.updateBookingStatus(
      bookingId,
      vendorId,
      "cancelled",
      userId
    );


  };



// ==========================================
// CHECK IN
// ==========================================

exports.checkInGuest =
  async (
    bookingId,
    vendorId,
    userId
  ) => {


    return exports.updateBookingStatus(
      bookingId,
      vendorId,
      "checked_in",
      userId
    );


  };


// ==========================================
// CHECK OUT
// ==========================================

exports.checkOutGuest =
  async (
    bookingId,
    vendorId,
    userId
  ) => {


    return exports.updateBookingStatus(
      bookingId,
      vendorId,
      "completed",
      userId
    );


  };