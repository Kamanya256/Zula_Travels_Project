const db = require('../../config/db');

// =================================
// ADD ITEM TO CART
// =================================
exports.addToCart = async (data) => {

  const {
    user_id,
    service_type,
    service_id,
    quantity,
    unit_price
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO cart_items
    (
      user_id,
      service_type,
      service_id,
      quantity,
      unit_price
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      user_id,
      service_type,
      service_id,
      quantity || 1,
      unit_price || 0
    ]
  );

  return {
    id: result.insertId,
    message: 'Item added to cart'
  };
};

// =================================
// GET MY CART
// =================================
exports.getCart = async (userId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM cart_items
    WHERE user_id = ?
    ORDER BY id DESC
    `,
    [userId]
  );

  return rows;
};

// =================================
// REMOVE CART ITEM
// =================================
exports.removeCartItem = async (
  itemId,
  userId
) => {

  await db.query(
    `
    DELETE FROM cart_items
    WHERE id = ?
    AND user_id = ?
    `,
    [itemId, userId]
  );

  return {
    message: 'Item removed'
  };
};

// =================================
// CHECKOUT CART
// =================================
exports.checkoutCart = async (userId) => {

  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    // -------------------------
    // GET CART ITEMS
    // -------------------------
    const [cartItems] = await connection.query(
      `
      SELECT *
      FROM cart_items
      WHERE user_id = ?
      `,
      [userId]
    );

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // -------------------------
    // CALCULATE TOTAL
    // -------------------------
    let totalAmount = 0;

    for (const item of cartItems) {
      totalAmount += (
        Number(item.unit_price) *
        Number(item.quantity)
      );
    }

    // -------------------------
    // CREATE BOOKING
    // -------------------------
    const [bookingResult] =
      await connection.query(
        `
        INSERT INTO bookings
        (
          user_id,
          status,
          total_amount,
          currency,
          payment_status
        )
        VALUES
        (?, 'pending', ?, 'USD', 'pending')
        `,
        [
          userId,
          totalAmount
        ]
      );

    const bookingId =
      bookingResult.insertId;

    // -------------------------
    // CREATE BOOKING ITEMS
    // -------------------------
    for (const item of cartItems) {

      await connection.query(
        `
        INSERT INTO booking_items
        (
          booking_id,
          service_type,
          service_id,
          quantity,
          unit_price
        )
        VALUES
        (?, ?, ?, ?, ?)
        `,
        [
          bookingId,
          item.service_type,
          item.service_id,
          item.quantity,
          item.unit_price
        ]
      );
    }

    // -------------------------
    // CLEAR CART
    // -------------------------
    await connection.query(
      `
      DELETE FROM cart_items
      WHERE user_id = ?
      `,
      [userId]
    );

    await connection.commit();

    return {
      booking_id: bookingId,
      total_amount: totalAmount,
      items: cartItems.length,
      status: 'pending',
      payment_status: 'pending'
    };

  } catch (error) {

    await connection.rollback();

    throw error;

  } finally {

    connection.release();

  }
};