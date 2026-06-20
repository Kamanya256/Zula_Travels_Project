const db = require('../../config/db');

exports.getVendorFinance = async (vendorId) => {

  const [[summary]] = await db.query(
    `
    SELECT
      COALESCE(SUM(gross_amount), 0) AS total_revenue,
      COALESCE(SUM(commission_amount), 0) AS total_commission,
      COALESCE(SUM(net_amount), 0) AS net_earnings
    FROM vendor_ledger
    WHERE vendor_id = ?
    `,
    [vendorId]
  );

  const [[payouts]] = await db.query(
    `
    SELECT
      COALESCE(SUM(amount), 0) AS total_payouts
    FROM vendor_payouts
    WHERE vendor_id = ?
    AND status = 'completed'
    `,
    [vendorId]
  );

  const availableBalance =
    Number(summary.net_earnings) -
    Number(payouts.total_payouts);

  return {
    total_revenue: Number(summary.total_revenue),
    total_commission: Number(summary.total_commission),
    net_earnings: Number(summary.net_earnings),
    total_payouts: Number(payouts.total_payouts),
    available_balance: availableBalance
  };

};