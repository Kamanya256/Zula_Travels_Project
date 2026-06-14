const db = require('../../config/db');

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
    LEFT JOIN users u
      ON u.id = b.user_id
    WHERE b.vendor_id = ?
    ORDER BY b.id DESC
    `,
    [vendorId]
  );

  return rows;
};

exports.approveBooking = async (
  bookingId,
  vendorId
) => {

  const [result] = await db.query(
    `
    UPDATE bookings
    SET status='confirmed'
    WHERE id = ?
    AND vendor_id = ?
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

exports.getBookingById = async (
  bookingId,
  vendorId
) => {

  const [[booking]] = await db.query(
    `
    SELECT *
    FROM bookings
    WHERE id = ?
    AND vendor_id = ?
    `,
    [bookingId, vendorId]
  );

  if (!booking) {
    throw new Error('Booking not found');
  }

  return booking;
};

exports.updateBookingStatus = async (
  bookingId,
  vendorId,
  status
) => {

  const allowedStatuses = [
    'confirmed',
    'cancelled',
    'completed'
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error('Invalid booking status');
  }

  const [result] = await db.query(
    `
    UPDATE bookings
    SET status = ?
    WHERE id = ?
    AND vendor_id = ?
    `,
    [
      status,
      bookingId,
      vendorId
    ]
  );

  if (result.affectedRows === 0) {
    throw new Error('Booking not found');
  }

  return {
    booking_id: bookingId,
    status
  };
};

exports.rejectBooking = async (
  bookingId,
  vendorId
) => {

  const [result] = await db.query(
    `
    UPDATE bookings
    SET status='cancelled'
    WHERE id = ?
    AND vendor_id = ?
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