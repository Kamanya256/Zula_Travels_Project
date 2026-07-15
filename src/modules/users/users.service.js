const db = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ========================
// REGISTER USER
// ========================
exports.registerUser = async (data) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      user_type
    } = data;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const [existing] = await db.query(
      `SELECT id FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (existing.length > 0) {
      throw new Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `
      INSERT INTO users
        (first_name, last_name, email, phone, password_hash, user_type)
      VALUES
        (?, ?, ?, ?, ?, ?)
      `,
      [
        first_name || null,
        last_name || null,
        email,
        phone || null,
        passwordHash,
        user_type || 'customer'
      ]
    );

    return {
      success: true,
      user_id: result.insertId,
      message: 'User registered successfully'
    };

  } catch (error) {
    throw new Error(error.message);
  }
};

// ========================
// LOGIN USER
// ========================
exports.login = async (data) => {
  try {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const [rows] = await db.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (rows.length === 0) {
      throw new Error('User not found');
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.user_type,
        vendor_id: user.vendor_id || null
      },
      process.env.JWT_SECRET || 'secretkey',
      {
        expiresIn: '1d'
      }
    );

    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.user_type,
        vendor_id: user.vendor_id || null
      }
    };

  } catch (error) {
    throw new Error(error.message);
  }
};