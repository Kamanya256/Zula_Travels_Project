const db = require('../../config/db');

// ======================================
// GET ALL DESTINATIONS
// ======================================
exports.getAllDestinations = async () => {

  const [rows] = await db.query(`
    SELECT
      id,
      country,
      city,
      slug,
      description,
      latitude,
      longitude
    FROM destinations
    ORDER BY country, city
  `);

  return rows;
};

// ======================================
// GET DESTINATION BY ID
// ======================================
exports.getDestinationById = async (id) => {

  const [rows] = await db.query(`
    SELECT *
    FROM destinations
    WHERE id = ?
  `, [id]);

  if (rows.length === 0) {
    throw new Error('Destination not found');
  }

  return rows[0];
};
// ======================================
// GET HOTELS BY DESTINATION
// ======================================
exports.getHotelsByDestination = async (destinationId) => {

  const [rows] = await db.query(`
    SELECT
      id,
      name,
      address,
      rating,
      description,
      provider_id
    FROM hotels
    WHERE destination_id = ?
    ORDER BY rating DESC
  `, [destinationId]);

  return rows;
};
// ======================================
// GET CARS BY DESTINATION
// ======================================
exports.getCarsByDestination = async (destinationId) => {

  const [rows] = await db.query(`
    SELECT
      c.id,
      c.make,
      c.model,
      c.year,
      c.category,
      c.seating_capacity,
      c.transmission,
      c.fuel_type,
      c.image_url,
      chr.base_rate_per_day,
      chr.currency
    FROM cars c
    LEFT JOIN car_hire_rates chr
      ON c.id = chr.car_id
    WHERE c.destination_id = ?
    ORDER BY c.id DESC
  `, [destinationId]);

  return rows;
};

// ======================================
// GET TOURS BY DESTINATION
// ======================================
exports.getToursByDestination = async (destinationId) => {

  const [rows] = await db.query(`
    SELECT
      id,
      slug,
      title,
      short_description,
      duration_days
    FROM tours
    WHERE destination_id = ?
    ORDER BY id DESC
  `, [destinationId]);

  return rows;
};

// ======================================
// DESTINATION OVERVIEW
// ======================================
exports.getDestinationOverview = async (destinationId) => {

  // Destination
  const [destination] = await db.query(
    `
    SELECT
      id,
      country,
      city,
      description
    FROM destinations
    WHERE id = ?
    `,
    [destinationId]
  );

  if (!destination.length) {
    throw new Error('Destination not found');
  }

  // Hotels
  const [hotels] = await db.query(
    `
    SELECT COUNT(*) AS total_hotels
    FROM hotels
    WHERE destination_id = ?
    `,
    [destinationId]
  );

  // Cars
  const [cars] = await db.query(
    `
    SELECT COUNT(*) AS total_cars
    FROM cars
    WHERE destination_id = ?
    `,
    [destinationId]
  );

  // Tours
  const [tours] = await db.query(
    `
    SELECT COUNT(*) AS total_tours
    FROM tours
    `
  );

  return {
    destination: destination[0],
    statistics: {
      hotels: hotels[0].total_hotels,
      cars: cars[0].total_cars,
      tours: tours[0].total_tours
    }
  };
};