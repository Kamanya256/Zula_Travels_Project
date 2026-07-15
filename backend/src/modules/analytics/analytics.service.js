const db = require("../../config/db");

// =============================
// REVENUE (WEEK / MONTH / YEAR)
// =============================
exports.getRevenueStats = async (period = "monthly") => {
  let groupBy = "";

  if (period === "weekly") {
    groupBy = "DAYNAME(created_at)";
  } else if (period === "yearly") {
    groupBy = "YEAR(created_at)";
  } else {
    groupBy = "MONTHNAME(created_at)";
  }

  const [rows] = await db.query(
    `
    SELECT 
      ${groupBy} AS label,
      SUM(amount) AS revenue
    FROM payments
    WHERE status = 'paid'
    GROUP BY label
    ORDER BY MIN(created_at)
    `
  );

  return rows;
};

// =============================
// BOOKINGS ANALYTICS
// =============================
exports.getBookingStats = async (period = "monthly") => {
  let groupBy = "";

  if (period === "weekly") {
    groupBy = "DAYNAME(created_at)";
  } else if (period === "yearly") {
    groupBy = "YEAR(created_at)";
  } else {
    groupBy = "MONTHNAME(created_at)";
  }

  const [rows] = await db.query(
    `
    SELECT 
      ${groupBy} AS label,
      COUNT(*) AS bookings
    FROM bookings
    GROUP BY label
    ORDER BY MIN(created_at)
    `
  );

  return rows;
};