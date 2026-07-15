const db = require("../../config/db");

// ======================
// DASHBOARD STATS
// ======================
exports.getDashboardStats = async () => {
  // Customers
  const [[customers]] = await db.query(`
    SELECT COUNT(*) AS total
    FROM users
    WHERE user_type = 'customer'
  `);

  // Vendors
  const [[vendors]] = await db.query(`
    SELECT COUNT(*) AS total
    FROM vendors
  `);

  // Admins
  const [[admins]] = await db.query(`
    SELECT COUNT(*) AS total
    FROM users
    WHERE user_type = 'admin'
  `);

  // Bookings
  const [[bookings]] = await db.query(`
    SELECT COUNT(*) AS total
    FROM bookings
  `);

  // Revenue
  const [[revenue]] = await db.query(`
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM payments
    WHERE status = 'paid'
  `);

  return {
    customers: Number(customers.total),
    vendors: Number(vendors.total),
    admins: Number(admins.total),
    bookings: Number(bookings.total),
    revenue: Number(revenue.total),
  };
};

// ======================
// GET PENDING VENDORS
// ======================
exports.getPendingVendors = async () => {
  const [rows] = await db.query(`
    SELECT *
    FROM vendors
    WHERE status = 'pending'
    ORDER BY created_at DESC
  `);

  return rows;
};

// ======================
// APPROVE VENDOR
// ======================
exports.approveVendor = async (id) => {
  const [result] = await db.query(
    `
    UPDATE vendors
    SET status = 'approved'
    WHERE id = ?
    `,
    [id]
  );

  if (result.affectedRows === 0) {
    throw new Error("Vendor not found.");
  }

  return true;
};

// ======================
// REJECT VENDOR
// ======================
exports.rejectVendor = async (id) => {
  const [result] = await db.query(
    `
    UPDATE vendors
    SET status = 'rejected'
    WHERE id = ?
    `,
    [id]
  );

  if (result.affectedRows === 0) {
    throw new Error("Vendor not found.");
  }

  return true;
};

// ======================
// SUSPEND VENDOR
// ======================
exports.suspendVendor = async (id) => {
  const [result] = await db.query(
    `
    UPDATE vendors
    SET status = 'suspended'
    WHERE id = ?
    `,
    [id]
  );

  if (result.affectedRows === 0) {
    throw new Error("Vendor not found.");
  }

  return true;
};