const db = require("../../config/db");

const financialDocumentService =
  require("../financial-documents/financial-document.service");

// =========================================
// PLATFORM SETTINGS
// =========================================

const PLATFORM_COMMISSION = 10; // 10%

// =========================================
// CALCULATE COMMISSION
// =========================================

function calculateSettlement(amount) {

  const gross = Number(amount);

  const commission = Number(
    (gross * PLATFORM_COMMISSION / 100).toFixed(2)
  );

  const vendorAmount = Number(
    (gross - commission).toFixed(2)
  );

  return {
    gross,
    commission,
    vendorAmount
  };

}

// =========================================
// GET ALL PAYMENTS
// =========================================

exports.getAllPayments = async () => {

  const [payments] = await db.query(
    `
    SELECT

        p.*,

        b.status AS booking_status,
        b.payment_status,
        b.vendor_id,
        b.hotel_id

    FROM payments p

    LEFT JOIN bookings b
        ON b.id = p.booking_id

    ORDER BY p.id DESC
    `
  );

  return payments;

};

// =========================================
// CREATE PAYMENT
// =========================================

exports.createPayment = async (userId, data) => {

  const {

    booking_id,
    payment_method,
    provider

  } = data;

  // -------------------------
  // Verify Booking
  // -------------------------

  const [[booking]] = await db.query(
    `
    SELECT *

    FROM bookings

    WHERE id = ?
    AND user_id = ?
    `,
    [
      booking_id,
      userId
    ]
  );

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.payment_status === "paid") {
    throw new Error("Booking has already been paid");
  }

  // -------------------------
  // Prevent Duplicate Payment
  // -------------------------

  const [[pendingPayment]] = await db.query(
    `
    SELECT id

    FROM payments

    WHERE booking_id = ?
    AND status = 'pending'
    `,
    [
      booking.id
    ]
  );

  if (pendingPayment) {
    throw new Error(
      "A pending payment already exists for this booking."
    );
  }

  // -------------------------
  // Calculate Settlement
  // -------------------------

  const settlement =
    calculateSettlement(
      booking.total_amount
    );

  const transactionId =
    "PAY-" + Date.now();

  // -------------------------
  // Save Payment
  // -------------------------

  const [result] = await db.query(
    `
    INSERT INTO payments
    (

        booking_id,
        user_id,

        amount,
        currency,

        method,
        provider,

        status,

        transaction_id,

        gross_amount,
        commission_amount,
        vendor_amount

    )

    VALUES
    (
        ?,?,
        ?,?,
        ?,?,
        'pending',
        ?,?,?,?
    )
    `,
    [

      booking.id,

      userId,

      settlement.gross,

      booking.currency,

      payment_method,

      provider || null,

      transactionId,

      settlement.gross,

      settlement.commission,

      settlement.vendorAmount

    ]
  );

  return {

    payment_id: result.insertId,

    transaction_id: transactionId,

    amount: settlement.gross,

    commission: settlement.commission,

    vendor_amount: settlement.vendorAmount,

    currency: booking.currency,

    status: "pending"

  };

};

// =========================================
// CONFIRM PAYMENT
// =========================================

exports.confirmPayment = async (paymentId) => {

  const connection =
    await db.getConnection();

  try {

    await connection.beginTransaction();

    // -------------------------
    // Lock Payment
    // -------------------------

    const [[payment]] =
      await connection.execute(
        `
        SELECT *

        FROM payments

        WHERE id = ?

        FOR UPDATE
        `,
        [
          paymentId
        ]
      );

    if (!payment) {
      throw new Error(
        "Payment not found"
      );
    }

    if (payment.status === "paid") {
      throw new Error(
        "Payment has already been confirmed."
      );
    }

    // -------------------------
    // Mark Payment Paid
    // -------------------------

    await connection.execute(
      `
      UPDATE payments

      SET

          status = 'paid',
          payment_date = NOW()

      WHERE id = ?
      `,
      [
        paymentId
      ]
    );

    // -------------------------
    // Confirm Booking
    // -------------------------

    await connection.execute(
      `
      UPDATE bookings

      SET

          payment_status = 'paid',
          status = 'confirmed'

      WHERE id = ?
      `,
      [
        payment.booking_id
      ]
    );

    // -------------------------
    // Generate Invoice
    // -------------------------

    const invoice =
      await financialDocumentService.createDocument(

        payment.booking_id,

        payment.id,

        payment.user_id,

        "invoice",

        payment.amount,

        payment.currency

      );

    // -------------------------------------------------
    // NEXT STEP
    // Credit Vendor Wallet
    // (We'll add this immediately after creating
    // the Vendor Wallet module.)
    // -------------------------------------------------

    await connection.commit();

    return {

      payment_id: payment.id,

      booking_id: payment.booking_id,

      status: "paid",

      gross_amount: payment.gross_amount,

      commission_amount: payment.commission_amount,

      vendor_amount: payment.vendor_amount,

      invoice

    };

  } catch (error) {

    await connection.rollback();

    throw error;

  } finally {

    connection.release();

  }

};