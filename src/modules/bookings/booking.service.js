const db = require('../../config/db');

// ==================================================
// CREATE HOTEL ROOM BOOKING
// ==================================================
exports.createBooking = async (data) => {
  const {
    user_id,
    room_id,
    check_in,
    check_out
  } = data;

  if (!user_id || !room_id || !check_in || !check_out) {
    throw new Error('Missing required booking details');
  }

  const [rooms] = await db.query(
    `
    SELECT
      hr.*,
      h.id AS hotel_id,
      h.name AS hotel_name
    FROM hotel_rooms hr
    JOIN hotels h ON h.id = hr.hotel_id
    WHERE hr.id = ?
    `,
    [room_id]
  );

  if (rooms.length === 0) {
    throw new Error('Room not found');
  }

  const room = rooms[0];

  const nights = Math.ceil(
    (new Date(check_out) - new Date(check_in)) /
    (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    throw new Error('Check-out must be after check-in');
  }

  const totalAmount =
    nights * Number(room.price_per_night);

  const [bookingResult] = await db.query(
    `
    INSERT INTO bookings
    (
      user_id,
      hotel_id,
      check_in,
      check_out,
      status,
      payment_status,
      total_amount,
      currency
    )
    VALUES
    (?, ?, ?, ?, 'pending', 'pending', ?, ?)
    `,
    [
      user_id,
      room.hotel_id,
      check_in,
      check_out,
      totalAmount,
      room.currency
    ]
  );

  const bookingId = bookingResult.insertId;

  await db.query(
    `
    INSERT INTO booking_items
    (
      booking_id,
      service_type,
      service_id,
      quantity,
      unit_price,
      start_date,
      end_date,
      hotel_id
    )
    VALUES
    (?, 'hotel_room', ?, 1, ?, ?, ?, ?)
    `,
    [
      bookingId,
      room.id,
      room.price_per_night,
      check_in,
      check_out,
      room.hotel_id
    ]
  );

  return {
    booking_id: bookingId,
    status: 'pending',
    payment_status: 'pending',
    total_amount: totalAmount
  };
};

// ==================================================
// CHECKOUT CART
// ==================================================
exports.checkoutBooking = async (userId) => {

  const [cartItems] = await db.query(
    `
    SELECT *
    FROM cart
    WHERE user_id = ?
    `,
    [userId]
  );

  if (cartItems.length === 0) {
    throw new Error('Cart is empty');
  }

  let totalAmount = 0;

  for (const item of cartItems) {
    totalAmount +=
      Number(item.unit_price) *
      Number(item.quantity);
  }

  const [bookingResult] = await db.query(
    `
    INSERT INTO bookings
    (
      user_id,
      status,
      payment_status,
      total_amount,
      currency
    )
    VALUES
    (?, 'pending', 'pending', ?, 'USD')
    `,
    [userId, totalAmount]
  );

  const bookingId = bookingResult.insertId;

  for (const item of cartItems) {

    await db.query(
      `
      INSERT INTO booking_items
      (
        booking_id,
        service_type,
        service_id,
        quantity,
        unit_price
      )
      VALUES
      (?, ?, ?, ?, ?)
      `,
      [
        bookingId,
        item.service_type,
        item.service_id,
        item.quantity,
        item.unit_price
      ]
    );
  }

  await db.query(
    `
    DELETE FROM cart
    WHERE user_id = ?
    `,
    [userId]
  );

  return {
    booking_id: bookingId,
    total_amount: totalAmount,
    items: cartItems.length,
    status: 'pending',
    payment_status: 'pending'
  };
};

// ==================================================
// GET MY BOOKINGS
// ==================================================
exports.getMyBookings = async (userId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM bookings
    WHERE user_id = ?
    ORDER BY id DESC
    `,
    [userId]
  );

  return rows;
};

// ==================================================
// GET BOOKING DETAILS
// ==================================================
exports.getBookingDetails = async (
  bookingId,
  userId
) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM bookings
    WHERE id = ?
    AND user_id = ?
    `,
    [bookingId, userId]
  );

  if (rows.length === 0) {
    throw new Error('Booking not found');
  }

  return rows[0];
};

// ==================================================
// CANCEL BOOKING
// ==================================================
exports.cancelBooking = async (
  bookingId,
  userId
) => {

  const [result] = await db.query(
    `
    UPDATE bookings
    SET status = 'cancelled'
    WHERE id = ?
    AND user_id = ?
    `,
    [bookingId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Booking not found');
  }

  return {
    message: 'Booking cancelled successfully'
  };
};

// ==================================================
// ADMIN: GET ALL BOOKINGS
// ==================================================
exports.getAllBookings = async () => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM bookings
    ORDER BY id DESC
    `
  );

  return rows;
};

// ==================================================
// ADMIN: UPDATE STATUS
// ==================================================
exports.updateBookingStatus = async (
  bookingId,
  status
) => {

  await db.query(
    `
    UPDATE bookings
    SET status = ?
    WHERE id = ?
    `,
    [status, bookingId]
  );

  return {
    message: 'Booking status updated'
  };
};