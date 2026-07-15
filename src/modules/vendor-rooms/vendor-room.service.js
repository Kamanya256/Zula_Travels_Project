const db = require('../../config/db');

exports.getVendorRooms = async (vendorId) => {

  const [rows] = await db.query(
    `
    SELECT
      hr.*,
      h.name AS hotel_name
    FROM hotel_rooms hr
    JOIN hotels h
      ON h.id = hr.hotel_id
    WHERE h.vendor_id = ?
    ORDER BY hr.id DESC
    `,
    [vendorId]
  );

  return rows;
};

exports.createRoom = async (
  vendorId,
  data
) => {

  const {
    hotel_id,
    room_type,
    capacity,
    price_per_night,
    currency,
    available_quantity,
    description
  } = data;

  const [[hotel]] = await db.query(
    `
    SELECT id
    FROM hotels
    WHERE id = ?
    AND vendor_id = ?
    `,
    [hotel_id, vendorId]
  );

  if (!hotel) {
    throw new Error(
      'Hotel not found or not owned by vendor'
    );
  }

  const [result] = await db.query(
    `
    INSERT INTO hotel_rooms
    (
      hotel_id,
      room_type,
      capacity,
      price_per_night,
      currency,
      available_quantity,
      description
    )
    VALUES
    (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      hotel_id,
      room_type,
      capacity,
      price_per_night,
      currency,
      available_quantity,
      description
    ]
  );

  return {
    room_id: result.insertId
  };
};