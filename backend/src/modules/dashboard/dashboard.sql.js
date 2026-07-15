// ======================================================
// ZULA TRAVELS 2026
// DASHBOARD SQL
// ======================================================

module.exports = {

    GET_USER_STATS: `
        SELECT
            COUNT(*) AS total_users,
            SUM(CASE WHEN status='active' THEN 1 ELSE 0 END) AS active_users,
            SUM(CASE WHEN status='inactive' THEN 1 ELSE 0 END) AS inactive_users,
            SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending_users,
            SUM(CASE WHEN status='suspended' THEN 1 ELSE 0 END) AS suspended_users,
            SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) AS rejected_users,
            SUM(CASE WHEN user_type='customer' THEN 1 ELSE 0 END) AS customers,
            SUM(CASE WHEN user_type='vendor' THEN 1 ELSE 0 END) AS vendors,
            SUM(CASE WHEN user_type='admin' THEN 1 ELSE 0 END) AS admins
        FROM users
        WHERE is_deleted = 0
    `,

    GET_RECENT_USERS: `
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            status,
            user_type,
            created_at
        FROM users
        WHERE is_deleted = 0
        ORDER BY created_at DESC
        LIMIT 10
    `

};