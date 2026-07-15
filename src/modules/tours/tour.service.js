const db = require('../../config/db');

// ======================================
// GET ALL TOURS
// ======================================
exports.getAllTours = async () => {

    const [rows] = await db.query(`
    SELECT
      id,
      slug,
      title,
      short_description,
      duration_days
    FROM tours
    ORDER BY id DESC
  `);

    return rows;
};

// ======================================
// GET TOUR BY ID
// ======================================
exports.getTourById = async (id) => {

    const [rows] = await db.query(`
    SELECT *
    FROM tours
    WHERE id = ?
  `, [id]);

    if (rows.length === 0) {
        throw new Error('Tour not found');
    }

    return rows[0];
};