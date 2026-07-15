const db = require('../../config/db');

exports.getPayoutRequests = async () => {

  const [rows] = await db.query(`
    SELECT
      vp.*,
      v.name AS vendor_name,
      v.company_name
    FROM vendor_payouts vp
    LEFT JOIN vendors v
      ON v.id = vp.vendor_id
    ORDER BY vp.id DESC
  `);

  return rows;
};

exports.approvePayout = async (payoutId) => {

  const [[payout]] = await db.query(`
    SELECT *
    FROM vendor_payouts
    WHERE id = ?
  `, [payoutId]);

  if (!payout) {
    throw new Error('Payout not found');
  }

  await db.query(`
    UPDATE vendor_payouts
    SET
      status='approved',
      approved_at=NOW()
    WHERE id=?
  `, [payoutId]);

  await db.query(`
    UPDATE vendor_ledger
    SET
      status='settled',
      settlement_date=NOW()
    WHERE vendor_id=?
      AND status='pending'
  `, [payout.vendor_id]);

  return true;
};

exports.rejectPayout = async (payoutId) => {

  const [result] = await db.query(`
    UPDATE vendor_payouts
    SET status='rejected'
    WHERE id=?
  `, [payoutId]);

  if (result.affectedRows === 0) {
    throw new Error('Payout not found');
  }

  return true;
};