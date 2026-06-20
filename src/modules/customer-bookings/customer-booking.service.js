const db = require('../../config/db');

const financialDocumentService =
  require('../financial-documents/financial-document.service');

exports.createBooking = async (userId, data) => {

  const {
    hotel_id,
    room_id,
    check_in,
    check_out
  } = data;

  const [[room]] = await db.query(
    `
    SELECT *
    FROM hotel_rooms
    WHERE id = ?
    `,
    [room_id]
  );

  if (!room) {
    throw new Error('Room not found');
  }

  const nights =
    Math.ceil(
      (
        new Date(check_out) -
        new Date(check_in)
      ) /
      (1000 * 60 * 60 * 24)
    );

  const totalAmount =
    nights * room.price_per_night;

  const [[hotel]] = await db.query(
    `
    SELECT vendor_id
    FROM hotels
    WHERE id = ?
    `,
    [hotel_id]
  );

  if (!hotel) {
    throw new Error('Hotel not found');
  }

  const [result] = await db.query(
    `
    INSERT INTO bookings
    (
      user_id,
      vendor_id,
      booking_date,
      status,
      total_amount,
      currency,
      hotel_id,
      check_in,
      check_out,
      payment_status
    )
    VALUES
    (
      ?,
      ?,
      NOW(),
      'pending',
      ?,
      ?,
      ?,
      ?,
      ?,
      'pending'
    )
    `,
    [
      userId,
      hotel.vendor_id,
      totalAmount,
      room.currency,
      hotel_id,
      check_in,
      check_out
    ]
  );

  await financialDocumentService.createDocument(
    result.insertId,
    null,
    userId,
    'proforma_invoice',
    totalAmount,
    room.currency
  );

  return {
    booking_id: result.insertId,
    total_amount: totalAmount
  };
};

exports.getCustomerBookings = async (userId) => {

  const [rows] = await db.query(
    `
    SELECT
      b.id,
      b.status,
      b.total_amount,
      b.currency,
      b.check_in,
      b.check_out,
      b.payment_status,
      h.name AS hotel_name
    FROM bookings b
    LEFT JOIN hotels h
      ON h.id = b.hotel_id
    WHERE b.user_id = ?
    ORDER BY b.id DESC
    `,
    [userId]
  );

  return rows;
};