const db = require('../../config/db');
const financialDocumentService = require('../financial-documents/financial-document.service');
const vendorLedgerService = require('../vendor-ledger/vendor-ledger.service');

exports.createPayment = async (bookingId, userId, paymentMethod) => {
  const [[booking]] = await db.query(
    `SELECT *
     FROM bookings
     WHERE id = ?`,
    [bookingId]
  );

  if (!booking) {
    throw new Error('Booking not found');
  }

  const transactionId = 'PAY-' + Date.now();

  const [result] = await db.query(
    `INSERT INTO payments
      (booking_id, user_id, amount, currency, method, status, transaction_id)
     VALUES
      (?, ?, ?, ?, ?, 'pending', ?)`,
    [
      booking.id,
      userId,
      booking.total_amount,
      booking.currency || 'USD',
      paymentMethod,
      transactionId
    ]
  );

  await financialDocumentService.createDocument(
    booking.id,
    result.insertId,
    userId,
    'invoice',
    booking.total_amount,
    booking.currency || 'USD'
  );

  return {
    payment_id: result.insertId,
    transaction_id: transactionId,
    status: 'pending'
  };
};

exports.confirmPayment = async (paymentId) => {
  const [[payment]] = await db.query(
    `SELECT *
     FROM payments
     WHERE id = ?`,
    [paymentId]
  );

  if (!payment) {
    throw new Error('Payment not found');
  }

  if (payment.status === 'paid') {

    return {
      payment_id: payment.id,
      booking_id: payment.booking_id,
      gross_amount:
        payment.gross_amount || payment.amount,
      commission_amount:
        payment.commission_amount || 0,
      vendor_amount:
        payment.vendor_amount || 0,
      status: 'paid'
    };

  }

  const [[booking]] = await db.query(
    `SELECT *
     FROM bookings
     WHERE id = ?`,
    [payment.booking_id]
  );

  if (!booking) {
    throw new Error('Booking not found');
  }

  const commissionRate = 10;
  const grossAmount = Number(payment.amount);
  const commissionAmount = (grossAmount * commissionRate) / 100;
  const vendorAmount = grossAmount - commissionAmount;

  await db.query(
    `UPDATE payments
     SET status = 'paid',
         gross_amount = ?,
         commission_amount = ?,
         vendor_amount = ?
     WHERE id = ?`,
    [grossAmount, commissionAmount, vendorAmount, payment.id]
  );

  await db.query(
    `UPDATE bookings
     SET status = 'confirmed',
         payment_status = 'paid'
     WHERE id = ?`,
    [booking.id]
  );

  const [[receipt]] = await db.query(
    `SELECT id
     FROM financial_documents
     WHERE payment_id = ?
       AND document_type = 'receipt'`,
    [payment.id]
  );

  if (!receipt) {
    await financialDocumentService.createDocument(
      booking.id,
      payment.id,
      payment.user_id,
      'receipt',
      payment.amount,
      payment.currency
    );
  }

  if (booking.vendor_id) {
    await vendorLedgerService.createLedgerEntry(
      booking,
      {
        ...payment,
        gross_amount: grossAmount,
        commission_amount: commissionAmount,
        vendor_amount: vendorAmount
      }
    );
  }

  return {
    payment_id: payment.id,
    booking_id: booking.id,
    gross_amount: grossAmount,
    commission_amount: commissionAmount,
    vendor_amount: vendorAmount,
    status: 'paid'
  };
};
