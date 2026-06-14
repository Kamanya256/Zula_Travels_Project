const db = require('../../config/db');

// =====================================
// GET ALL RESTAURANTS
// =====================================
exports.getAllRestaurants = async () => {

    const [rows] = await db.query(`
        SELECT
            id,
            destination_id,
            name,
            address,
            cuisine_type,
            rating,
            description,
            image_url
        FROM restaurants
        ORDER BY rating DESC
    `);

    return rows;
};

// =====================================
// GET RESTAURANT BY ID
// =====================================
exports.getRestaurantById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM restaurants
        WHERE id = ?
        `,
        [id]
    );

    if (rows.length === 0) {
        throw new Error('Restaurant not found');
    }

    return rows[0];
};

// =====================================
// GET DESTINATION RESTAURANTS
// =====================================
exports.getRestaurantsByDestination = async (destinationId) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM restaurants
        WHERE destination_id = ?
        ORDER BY rating DESC
        `,
        [destinationId]
    );

    return rows;
};