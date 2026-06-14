const db =
  require('../../config/db');

exports.createHotel = async (
  vendorId,
  data
) => {

  const {
    destination_id,
    name,
    address,
    rating,
    description
  } = data;

  const [result] =
    await db.query(
      `
      INSERT INTO hotels
      (
        destination_id,
        name,
        address,
        rating,
        description,
        vendor_id
      )
      VALUES (?,?,?,?,?,?)
      `,
      [
        destination_id,
        name,
        address,
        rating,
        description,
        vendorId
      ]
    );

  return {
    hotel_id: result.insertId
  };

};

exports.getMyHotels = async (
  vendorId
) => {

  const [rows] =
    await db.query(
      `
      SELECT *
      FROM hotels
      WHERE vendor_id = ?
      `,
      [vendorId]
    );

  return rows;

};

exports.updateHotel = async (
  hotelId,
  vendorId,
  data
) => {

  await db.query(
    `
    UPDATE hotels
    SET
      name=?,
      address=?,
      rating=?,
      description=?
    WHERE id=?
    AND vendor_id=?
    `,
    [
      data.name,
      data.address,
      data.rating,
      data.description,
      hotelId,
      vendorId
    ]
  );

  return {
    updated: true
  };

};

exports.deleteHotel = async (
  hotelId,
  vendorId
) => {

  await db.query(
    `
    DELETE FROM hotels
    WHERE id=?
    AND vendor_id=?
    `,
    [
      hotelId,
      vendorId
    ]
  );

};