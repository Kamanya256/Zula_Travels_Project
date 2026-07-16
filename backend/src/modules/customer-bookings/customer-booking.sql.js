// ======================================================
// ZULA TRAVELS 2026
// CUSTOMER BOOKINGS SQL
// ======================================================

module.exports = {

    // =====================================
    // GET HOTEL
    // =====================================

    GET_HOTEL: `
        SELECT
            id,
            vendor_id,
            name
        FROM hotels
        WHERE id = ?
        LIMIT 1
    `,


    // =====================================
    // GET ROOM
    // =====================================

    GET_ROOM: `
        SELECT
            id,
            hotel_id,
            room_type,
            capacity,
            price_per_night,
            currency,
            available_quantity
        FROM hotel_rooms
        WHERE id = ?
        LIMIT 1
    `,


    // =====================================
    // CREATE BOOKING
    // =====================================

    CREATE_BOOKING: `
        INSERT INTO bookings
        (
            user_id,
            vendor_id,
            hotel_id,
            room_id,
            booking_date,
            status,
            total_amount,
            currency,
            check_in,
            check_out,
            payment_status
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            NOW(),
            'pending',
            ?,
            ?,
            ?,
            ?,
            'pending'
        )
    `,


    // =====================================
    // REDUCE ROOM AVAILABILITY
    // =====================================

    UPDATE_ROOM_QUANTITY: `
        UPDATE hotel_rooms
        SET available_quantity = available_quantity - 1
        WHERE id = ?
    `,


    // =====================================
    // CUSTOMER BOOKINGS
    // =====================================

    GET_CUSTOMER_BOOKINGS: `
        SELECT

            b.id,
            b.booking_date,
            b.status,
            b.payment_status,
            b.total_amount,
            b.currency,
            b.check_in,
            b.check_out,

            h.name AS hotel_name,

            r.room_type,
            r.capacity

        FROM bookings b

        LEFT JOIN hotels h
            ON h.id = b.hotel_id

        LEFT JOIN hotel_rooms r
            ON r.id = b.room_id

        WHERE b.user_id = ?

        ORDER BY b.booking_date DESC
    `

};