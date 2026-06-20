const db = require('../../config/db');

exports.getAllPayouts = async () => {

  const [rows] = await db.query(`
    SELECT
      vp.*,
      COALESCE(v.company_name, v.name) AS vendor_name
    FROM vendor_payouts vp
    LEFT JOIN vendors v
      ON v.id = vp.vendor_id
    ORDER BY vp.id DESC
  `);

  return rows;
};

exports.approvePayout = async (payoutId) => {

  await db.query(
    `
    UPDATE vendor_payouts
    SET
      status='approved',
      approved_at=NOW()
    WHERE id=?
    `,
    [payoutId]
  );

  return true;
};

exports.rejectPayout = async (payoutId) => {

  await db.query(
    `
    UPDATE vendor_payouts
    SET status='rejected'
    WHERE id=?
    `,
    [payoutId]
  );

  return true;
};

exports.completePayout = async (payoutId) => {

  await db.query(
    `
    UPDATE vendor_payouts
    SET
      status='completed',
      completed_at=NOW()
    WHERE id=?
    `,
    [payoutId]
  );

  return true;
};