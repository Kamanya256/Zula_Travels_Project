const db = require('../../config/db');

exports.createVenue = async (vendorId, data) => {

  const {
    destination_id,
    name,
    venue_type,
    capacity,
    price_per_day,
    currency,
    description
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO venues
    (
      destination_id,
      name,
      venue_type,
      capacity,
      price_per_day,
      currency,
      description,
      vendor_id
    )
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      destination_id,
      name,
      venue_type,
      capacity,
      price_per_day,
      currency,
      description,
      vendorId
    ]
  );

  return {
    venue_id: result.insertId
  };
};

exports.getVendorVenues = async (vendorId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM venues
    WHERE vendor_id = ?
    ORDER BY id DESC
    `,
    [vendorId]
  );

  return rows;
};