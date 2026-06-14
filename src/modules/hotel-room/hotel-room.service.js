const db = require('../../config/db');

// =====================================
// GET ROOMS BY HOTEL
// =====================================
exports.getRoomsByHotel = async (hotelId) => {

  const [rows] = await db.query(
    `
    SELECT
      id,
      hotel_id,
      room_type,
      capacity,
      price_per_night,
      currency,
      description
    FROM hotel_rooms
    WHERE hotel_id = ?
    ORDER BY price_per_night ASC
    `,
    [hotelId]
  );

  return rows;
};

// =====================================
// GET SINGLE ROOM
// =====================================
exports.getRoomById = async (roomId) => {

  const [rows] = await db.query(
    `
    SELECT
      id,
      hotel_id,
      room_type,
      capacity,
      price_per_night,
      currency,
      description
    FROM hotel_rooms
    WHERE id = ?
    `,
    [roomId]
  );

  if (rows.length === 0) {
    throw new Error('Room not found');
  }

  return rows[0];
};