const db = require('../../config/db');
const bcrypt = require('bcrypt');

// =====================================
// REGISTER VENDOR
// =====================================
exports.registerVendor = async (data) => {

  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    business_name,
    business_type
  } = data;

  // Basic validation
  if (
    !first_name ||
    !email ||
    !password ||
    !business_name ||
    !business_type
  ) {
    throw new Error('Missing required fields');
  }

  // Check existing email
  const [existingUser] = await db.query(
    `SELECT id
         FROM users
         WHERE email = ?`,
    [email]
  );

  if (existingUser.length > 0) {
    throw new Error('Email already exists');
  }

  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    // Hash password
    const passwordHash =
      await bcrypt.hash(password, 10);

    // Create provider
    const [providerResult] =
      await connection.query(
        `
                INSERT INTO providers
                (
                    name,
                    business_type,
                    contact_email,
                    contact_phone,
                    is_verified
                )
                VALUES (?, ?, ?, ?, 0)
                `,
        [
          business_name,
          business_type,
          email,
          phone
        ]
      );

    const providerId =
      providerResult.insertId;

    // Create vendor user
    const [userResult] =
      await connection.query(
        `
                INSERT INTO users
                (
                    first_name,
                    last_name,
                    email,
                    phone,
                    password_hash,
                    user_type,
                    vendor_id,
                    status
                )
                VALUES
                (?, ?, ?, ?, ?, 'vendor', ?, 'active')
                `,
        [
          first_name,
          last_name || null,
          email,
          phone || null,
          passwordHash,
          providerId
        ]
      );

    await connection.commit();

    return {
      success: true,
      provider_id: providerId,
      user_id: userResult.insertId,
      business_name,
      business_type
    };

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }

};

// =====================================
// VENDOR DASHBOARD
// =====================================
exports.getDashboard = async (providerId) => {

  const [[provider]] = await db.query(
    `
    SELECT
      id,
      name,
      business_type
    FROM providers
    WHERE id = ?
    `,
    [providerId]
  );

  const [[hotelCount]] = await db.query(
    `
    SELECT COUNT(*) total
    FROM hotels
    WHERE vendor_id = ?
    `,
    [providerId]
  );

  const [[carCount]] = await db.query(
    `
    SELECT COUNT(*) total
    FROM cars
    WHERE vendor_id = ?
    `,
    [providerId]
  );

  const [[restaurantCount]] = await db.query(
    `
    SELECT COUNT(*) total
    FROM restaurants
    WHERE vendor_id = ?
    `,
    [providerId]
  );

  const [[venueCount]] = await db.query(
    `
    SELECT COUNT(*) total
    FROM venues
    WHERE vendor_id = ?
    `,
    [providerId]
  );

  const [[tourCount]] = await db.query(
    `
    SELECT COUNT(*) total
    FROM tour_packages
    WHERE vendor_id = ?
    `,
    [providerId]
  );

  const [[bookingCount]] = await db.query(
    `
    SELECT COUNT(*) total
    FROM bookings
    WHERE vendor_id = ?
    `,
    [providerId]
  );

  const [[revenue]] = await db.query(
    `
    SELECT
      COALESCE(SUM(vendor_amount),0) total
    FROM payments p
    JOIN bookings b
      ON b.id = p.booking_id
    WHERE b.vendor_id = ?
      AND p.status = 'paid'
    `,
    [providerId]
  );

  return {
    provider,

    stats: {
      hotels: hotelCount.total,
      cars: carCount.total,
      restaurants: restaurantCount.total,
      venues: venueCount.total,
      tours: tourCount.total,
      bookings: bookingCount.total,
      revenue: revenue.total
    }
  };
};