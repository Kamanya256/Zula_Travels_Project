const db = require('../../config/db');

// Get all tours belonging to vendor
exports.getVendorTours = async (vendorId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM tour_packages
    WHERE vendor_id = ?
    ORDER BY id DESC
    `,
    [vendorId]
  );

  return rows;
};

// Create tour
exports.createTour = async (vendorId, data) => {

  const {
    name,
    start_destination_id,
    end_destination_id,
    duration_days,
    price,
    currency,
    description
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO tour_packages
    (
      name,
      start_destination_id,
      end_destination_id,
      duration_days,
      price,
      currency,
      description,
      vendor_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      start_destination_id,
      end_destination_id,
      duration_days,
      price,
      currency,
      description,
      vendorId
    ]
  );

  return {
    tour_id: result.insertId
  };
};

// Get single tour
exports.getTourById = async (tourId, vendorId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM tour_packages
    WHERE id = ?
    AND vendor_id = ?
    `,
    [tourId, vendorId]
  );

  if (rows.length === 0) {
    throw new Error('Tour not found');
  }

  return rows[0];
};

// Delete tour
exports.deleteTour = async (tourId, vendorId) => {

  const [result] = await db.query(
    `
    DELETE FROM tour_packages
    WHERE id = ?
    AND vendor_id = ?
    `,
    [tourId, vendorId]
  );

  return {
    deleted: result.affectedRows
  };
};