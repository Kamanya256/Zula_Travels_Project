// ======================================================
// ZULA TRAVELS 2026
// DASHBOARD SERVICE
// ======================================================

const db = require("../../config/db");
const SQL = require("./dashboard.sql");

// ======================================================
// DASHBOARD STATISTICS
// ======================================================

exports.getDashboardStats = async () => {
    const [rows] = await db.query(SQL.GET_USER_STATS);

    const stats = rows[0];

    return {
        total_users: Number(stats.total_users),
        active_users: Number(stats.active_users),
        inactive_users: Number(stats.inactive_users),
        pending_users: Number(stats.pending_users),
        suspended_users: Number(stats.suspended_users),
        rejected_users: Number(stats.rejected_users),
        customers: Number(stats.customers),
        vendors: Number(stats.vendors),
        admins: Number(stats.admins)
    };
};

// ======================================================
// RECENT USERS
// ======================================================

exports.getRecentUsers = async () => {

    const [rows] = await db.query(
        SQL.GET_RECENT_USERS
    );

    return rows;

};