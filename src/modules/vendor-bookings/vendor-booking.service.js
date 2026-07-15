const db = require('../../config/db');

/**
 * GET ALL BOOKINGS FOR A VENDOR
 */
exports.getVendorBookings = async (vendorId) => {

  const [rows] = await db.query(
    `
    SELECT
      b.id,
      b.booking_date,
      b.status,
      b.total_amount,
      b.currency,
      b.payment_status,
      b.check_in,
      b.check_out,
      u.first_name,
      u.last_name,
      u.email
    FROM bookings b
    LEFT JOIN users u ON u.id = b.user_id
    WHERE b.vendor_id = ?
    ORDER BY b.id DESC
    `,
    [vendorId]
  );

  return rows;
};

/**
 * GET SINGLE BOOKING
 */
exports.getBookingById = async (bookingId, vendorId) => {

  const [[booking]] = await db.query(
    `
    SELECT *
    FROM bookings
    WHERE id = ? AND vendor_id = ?
    `,
    [bookingId, vendorId]
  );

  if (!booking) {
    throw new Error('Booking not found');
  }

  return booking;
};

/**
 * APPROVE BOOKING
 */
exports.approveBooking = async (bookingId, vendorId) => {

  const [result] = await db.query(
    `
    UPDATE bookings
    SET status = 'confirmed'
    WHERE id = ? AND vendor_id = ?
    `,
    [bookingId, vendorId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Booking not found');
  }

  return {
    booking_id: bookingId,
    status: 'confirmed'
  };
};

/**
 * REJECT BOOKING
 */
exports.rejectBooking = async (bookingId, vendorId) => {

  const [result] = await db.query(
    `
    UPDATE bookings
    SET status = 'cancelled'
    WHERE id = ? AND vendor_id = ?
    `,
    [bookingId, vendorId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Booking not found');
  }

  return {
    booking_id: bookingId,
    status: 'cancelled'
  };
};

/**
 * UPDATE BOOKING STATUS (SAFE FLOW CONTROL)
 */
exports.updateBookingStatus = async (
  bookingId,
  vendorId,
  status
) => {

  const allowedStatuses = [
    'confirmed',
    'checked_in',
    'completed',
    'cancelled'
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error('Invalid booking status');
  }

  const [[booking]] = await db.query(
    `
    SELECT *
    FROM bookings
    WHERE id = ? AND vendor_id = ?
    `,
    [bookingId, vendorId]
  );

  if (!booking) {
    throw new Error('Booking not found');
  }

  // RULES
  if (status === 'checked_in' && booking.status !== 'confirmed') {
    throw new Error('Only confirmed bookings can be checked in');
  }

  if (status === 'completed' && booking.status !== 'checked_in') {
    throw new Error('Guest must be checked in first');
  }

  const [result] = await db.query(
    `
    UPDATE bookings
    SET status = ?
    WHERE id = ? AND vendor_id = ?
    `,
    [status, bookingId, vendorId]
  );

  return {
    booking_id: bookingId,
    old_status: booking.status,
    new_status: status
  };
};