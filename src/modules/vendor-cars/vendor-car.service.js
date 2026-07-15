const db =
  require('../../config/db');

exports.getMyCars =
  async (vendorId) => {

    const [cars] =
      await db.query(
        `
      SELECT *
      FROM cars
      WHERE vendor_id = ?
      ORDER BY id DESC
      `,
        [vendorId]
      );

    return cars;
  };

exports.createCar =
  async (vendorId, data) => {

    const {
      destination_id,
      make,
      model,
      plate_number,
      year,
      seating_capacity,
      category
    } = data;

    const [result] =
      await db.query(
        `
      INSERT INTO cars
      (
        destination_id,
        make,
        model,
        plate_number,
        year,
        seating_capacity,
        category,
        vendor_id
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          destination_id,
          make,
          model,
          plate_number,
          year,
          seating_capacity,
          category,
          vendorId
        ]
      );

    return {
      car_id:
        result.insertId
    };
  };