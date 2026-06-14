const db = require('../../config/db');

// =====================================
// GET ALL HOTELS
// =====================================
exports.getAllHotels = async () => {

  const [rows] = await db.query(`
    SELECT
      id,
      name,
      location,
      description,
      star_rating,
      image_url
    FROM hotels
    ORDER BY name ASC
  `);

  return rows;
};

// =====================================
// GET HOTEL BY ID
// =====================================
exports.getHotelById = async (hotelId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM hotels
    WHERE id = ?
    `,
    [hotelId]
  );

  if (rows.length === 0) {
    throw new Error('Hotel not found');
  }

  return rows[0];
};

// =====================================
// SEARCH HOTELS
// =====================================
exports.searchHotels = async (keyword) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM hotels
    WHERE
      name LIKE ?
      OR location LIKE ?
    `,
    [
      `%${keyword}%`,
      `%${keyword}%`
    ]
  );

  return rows;
};