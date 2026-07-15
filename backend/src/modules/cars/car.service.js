const db = require('../../config/db');

// ======================================
// GET ALL CARS
// ======================================
exports.getAllCars = async () => {

  const [rows] = await db.query(`
    SELECT
      c.id,
      c.destination_id,
      c.make,
      c.model,
      c.year,
      c.category,
      c.seating_capacity,
      c.transmission,
      c.description,
      c.image_url,
      c.is_available,
      c.fuel_type,
      r.base_rate_per_day,
      r.currency
    FROM cars c
    LEFT JOIN car_hire_rates r
      ON c.id = r.car_id
    ORDER BY c.id DESC
  `);

  return rows;
};

// ======================================
// GET CAR BY ID
// ======================================
exports.getCarById = async (id) => {

  const [rows] = await db.query(`
    SELECT
      c.*,
      r.base_rate_per_day,
      r.currency
    FROM cars c
    LEFT JOIN car_hire_rates r
      ON c.id = r.car_id
    WHERE c.id = ?
  `, [id]);

  if (rows.length === 0) {
    throw new Error('Car not found');
  }

  return rows[0];
};