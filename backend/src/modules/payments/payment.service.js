const db = require('../../config/db');

// =====================
// GET ALL PAYMENTS
// =====================

exports.getAllPayments = async () => {

  const [rows] = await db.query(`
    SELECT *
    FROM payments
    ORDER BY id DESC
  `);

  return rows;

};

// =====================
// CREATE PAYMENT
// =====================

exports.createPayment = async (
  bookingId,
  userId,
  paymentMethod
) => {

  const [[booking]] =
    await db.query(
      `
      SELECT *
      FROM bookings
      WHERE id = ?
      `,
      [bookingId]
    );

  if (!booking) {
    throw new Error(
      'Booking not found'
    );
  }

  const transactionId =
    'PAY-' + Date.now();

  const [result] =
    await db.query(
      `
      INSERT INTO payments
      (
        booking_id,
        user_id,
        amount,
        currency,
        method,
        status,
        transaction_id
      )
      VALUES
      (
        ?, ?, ?, ?, ?, 'pending', ?
      )
      `,
      [
        booking.id,
        userId,
        booking.total_amount,
        booking.currency || 'USD',
        paymentMethod,
        transactionId
      ]
    );

  return {
    payment_id:
      result.insertId,

    transaction_id:
      transactionId,

    status:
      'pending'
  };

};

// =====================
// CONFIRM PAYMENT
// =====================

exports.confirmPayment =
  async (paymentId) => {

    const [[payment]] =
      await db.query(
        `
        SELECT *
        FROM payments
        WHERE id = ?
        `,
        [paymentId]
      );

    if (!payment) {
      throw new Error(
        'Payment not found'
      );
    }

    await db.query(
      `
      UPDATE payments
      SET status = 'paid'
      WHERE id = ?
      `,
      [paymentId]
    );

    return {
      payment_id:
        paymentId,

      status:
        'paid'
    };

  };