const db = require('../../config/db');

exports.getRevenueReport = async (vendorId) => {

  const [[bookings]] = await db.query(
    `
    SELECT
      COUNT(*) total_bookings,
      COALESCE(SUM(status='confirmed'),0) confirmed_bookings,
      COALESCE(SUM(status='pending'),0) pending_bookings,
      COALESCE(SUM(status='cancelled'),0) cancelled_bookings
    FROM bookings
    WHERE vendor_id = ?
    `,
    [vendorId]
  );

  const [[revenue]] = await db.query(
    `
    SELECT
      COALESCE(SUM(total_amount),0) total_revenue,
      COALESCE(
        SUM(
          CASE
            WHEN payment_status='paid'
            THEN total_amount
            ELSE 0
          END
        ),0
      ) paid_revenue,
      COALESCE(
        SUM(
          CASE
            WHEN payment_status!='paid'
            THEN total_amount
            ELSE 0
          END
        ),0
      ) unpaid_revenue
    FROM bookings
    WHERE vendor_id = ?
    `,
    [vendorId]
  );

  return {
    ...bookings,
    ...revenue
  };
};