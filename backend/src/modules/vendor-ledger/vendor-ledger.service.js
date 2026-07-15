const db = require('../../config/db');

exports.createLedgerEntry = async (
  booking,
  payment
) => {

  const [[existing]] = await db.query(
    `
    SELECT id
    FROM vendor_ledger
    WHERE payment_id = ?
    `,
    [payment.id]
  );

  if (existing) {
    return existing.id;
  }

  const commissionRate = 10;

  const grossAmount =
    Number(payment.amount);

  const commissionAmount =
    (grossAmount * commissionRate) / 100;

  const netAmount =
    grossAmount - commissionAmount;

  const [result] = await db.query(
    `
    INSERT INTO vendor_ledger
    (
      vendor_id,
      booking_id,
      payment_id,
      entry_type,
      gross_amount,
      commission_rate,
      commission_amount,
      net_amount,
      status
    )
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      booking.vendor_id,
      booking.id,
      payment.id,
      'booking_income',
      grossAmount,
      commissionRate,
      commissionAmount,
      netAmount,
      'pending'
    ]
  );

  return result.insertId;
};