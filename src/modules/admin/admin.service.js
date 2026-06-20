const db =
  require('../../config/db');

exports.getDashboard =
  async () => {

    const [[vendors]] =
      await db.query(`
        SELECT COUNT(*) total
        FROM vendors
      `);

    const [[customers]] =
      await db.query(`
        SELECT COUNT(*) total
        FROM users
        WHERE user_type='customer'
      `);

    const [[bookings]] =
      await db.query(`
        SELECT COUNT(*) total
        FROM bookings
      `);

    const [[revenue]] =
      await db.query(`
        SELECT
        IFNULL(SUM(amount),0) total
        FROM payments
        WHERE status='paid'
      `);

    const [[commission]] =
      await db.query(`
        SELECT
        IFNULL(SUM(commission_amount),0) total
        FROM vendor_ledger
      `);

    const [[pendingPayouts]] =
      await db.query(`
        SELECT COUNT(*) total
        FROM vendor_payouts
        WHERE status='pending'
      `);

    const [[pendingVendors]] =
      await db.query(`
        SELECT COUNT(*) total
        FROM vendors
        WHERE status='pending'
      `);

    return {
      vendors:
        vendors.total,

      customers:
        customers.total,

      bookings:
        bookings.total,

      revenue:
        Number(revenue.total),

      commissions:
        Number(commission.total),

      pending_payouts:
        pendingPayouts.total,

      pending_vendor_approvals:
        pendingVendors.total
    };

  };

exports.getPendingVendors =
  async () => {

    const [rows] =
      await db.query(`
        SELECT
          id,
          name,
          email,
          phone,
          company_name,
          business_type,
          status,
          created_at
        FROM vendors
        WHERE status='pending'
        ORDER BY id DESC
      `);

    return rows;

  };

exports.approveVendor =
  async (vendorId) => {

    const [result] =
      await db.query(
        `
        UPDATE vendors
        SET status='approved'
        WHERE id=?
        `,
        [vendorId]
      );

    if (
      result.affectedRows === 0
    ) {
      throw new Error(
        'Vendor not found'
      );
    }

    return true;

  };

exports.rejectVendor =
  async (vendorId) => {

    const [result] =
      await db.query(
        `
        UPDATE vendors
        SET status='rejected'
        WHERE id=?
        `,
        [vendorId]
      );

    if (
      result.affectedRows === 0
    ) {
      throw new Error(
        'Vendor not found'
      );
    }

    return true;

  };

exports.suspendVendor =
  async (vendorId) => {

    const [result] =
      await db.query(
        `
        UPDATE vendors
        SET status='suspended'
        WHERE id=?
        `,
        [vendorId]
      );

    if (
      result.affectedRows === 0
    ) {
      throw new Error(
        'Vendor not found'
      );
    }

    return true;

  };