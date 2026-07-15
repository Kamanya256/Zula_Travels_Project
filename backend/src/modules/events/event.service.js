const db = require('../../config/db');

// ============================
// GET ALL EVENTS
// ============================
exports.getAllEvents = async () => {

  const [rows] = await db.query(`
    SELECT
      id,
      destination_id,
      name,
      description,
      start_date,
      end_date,
      venue
    FROM events
    ORDER BY start_date ASC
  `);

  return rows;
};

// ============================
// GET EVENT BY ID
// ============================
exports.getEventById = async (id) => {

  const [rows] = await db.query(`
    SELECT *
    FROM events
    WHERE id = ?
  `, [id]);

  if (!rows.length) {
    throw new Error('Event not found');
  }

  return rows[0];
};

// ============================
// GET EVENTS BY DESTINATION
// ============================
exports.getEventsByDestination = async (destinationId) => {

  const [rows] = await db.query(`
    SELECT *
    FROM events
    WHERE destination_id = ?
    ORDER BY start_date ASC
  `, [destinationId]);

  return rows;
};