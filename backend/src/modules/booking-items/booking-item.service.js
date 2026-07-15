const db = require('../../config/db');

// ========================================
// ADD ITEM TO BOOKING
// ========================================
exports.addItem = async (data) => {

    const {
        booking_id,
        service_type,
        service_id,
        quantity,
        unit_price,
        start_date,
        end_date,
        hotel_id
    } = data;

    const [result] = await db.query(
        `
        INSERT INTO booking_items
        (
            booking_id,
            service_type,
            service_id,
            quantity,
            unit_price,
            start_date,
            end_date,
            hotel_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            booking_id,
            service_type,
            service_id,
            quantity || 1,
            unit_price,
            start_date || null,
            end_date || null,
            hotel_id || null
        ]
    );

    return {
        message: 'Item added successfully',
        id: result.insertId
    };
};

// ========================================
// GET ITEMS FOR BOOKING
// ========================================
exports.getBookingItems = async (bookingId) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM booking_items
        WHERE booking_id = ?
        `,
        [bookingId]
    );

    return rows;
};