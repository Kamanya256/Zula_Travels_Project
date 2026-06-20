const db = require('../../config/db');

exports.requestPayout = async (
  vendorId,
  data
) => {

  const {
    amount,
    payment_method,
    account_name,
    account_number,
    phone_number
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO vendor_payouts
    (
      vendor_id,
      amount,
      payment_method,
      account_name,
      account_number,
      phone_number
    )
    VALUES
    (?, ?, ?, ?, ?, ?)
    `,
    [
      vendorId,
      amount,
      payment_method,
      account_name,
      account_number,
      phone_number
    ]
  );

  return {
    payout_id: result.insertId,
    status: 'pending'
  };

};

exports.getVendorPayouts = async (
  vendorId
) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM vendor_payouts
    WHERE vendor_id = ?
    ORDER BY id DESC
    `,
    [vendorId]
  );

  return rows;

};