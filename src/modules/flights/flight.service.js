const db = require('../../config/db');

// ======================================
// GET ALL FLIGHTS
// ======================================
exports.getAllFlights = async () => {

  const [rows] = await db.query(`
    SELECT
      id,
      airline,
      flight_number,
      flight_type,
      departure_time,
      arrival_time,
      price,
      currency,
      seats_available,
      status
    FROM flights
    ORDER BY departure_time ASC
  `);

  return rows;
};

// ======================================
// GET FLIGHT BY ID
// ======================================
exports.getFlightById = async (id) => {

  const [rows] = await db.query(`
    SELECT
      id,
      origin_id,
      destination_id,
      airline,
      flight_number,
      flight_type,
      departure_time,
      arrival_time,
      duration_minutes,
      price,
      currency,
      seats_total,
      seats_available,
      aircraft_type,
      status
    FROM flights
    WHERE id = ?
  `, [id]);

  if (rows.length === 0) {
    throw new Error('Flight not found');
  }

  return rows[0];
};