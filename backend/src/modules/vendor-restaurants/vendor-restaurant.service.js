const db = require('../../config/db');

exports.getVendorRestaurants = async (vendorId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM restaurants
    WHERE vendor_id = ?
    ORDER BY id DESC
    `,
    [vendorId]
  );

  return rows;
};

exports.createRestaurant = async (
  vendorId,
  data
) => {

  const {
    destination_id,
    name,
    cuisine_type,
    price_range,
    description,
    rating,
    address,
    phone,
    email,
    website
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO restaurants
    (
      destination_id,
      name,
      cuisine_type,
      price_range,
      description,
      rating,
      address,
      phone,
      email,
      website,
      vendor_id
    )
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      destination_id,
      name,
      cuisine_type,
      price_range,
      description,
      rating,
      address,
      phone,
      email,
      website,
      vendorId
    ]
  );

  return {
    restaurant_id: result.insertId
  };
};