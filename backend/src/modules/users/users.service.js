const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SQL = require("./users.sql");
const validation = require("./users.validation");

// ======================================================
// REGISTER USER
// ======================================================

exports.registerUser = async (data) => {

  validation.validateRegister(data);
  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      user_type = "customer"
    } = data;

    const [existing] = await connection.query(
      SQL.GET_USER_BY_EMAIL,
      [email]
    );

    if (existing.length) {
      throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await connection.query(
      SQL.CREATE_USER,
      [
        first_name,
        last_name,
        email,
        phone || null,
        passwordHash,
        user_type,
        "active",
        0,
        0,
        1
      ]
    );

    const userId = result.insertId;

    const roleName =
      user_type === "admin"
        ? "admin"
        : user_type === "vendor"
          ? "vendor"
          : "customer";

    const [role] = await connection.query(
      SQL.GET_ROLE,
      [roleName]
    );

    if (!role.length) {
      throw new Error("Role not found");
    }

    await connection.query(
      SQL.ASSIGN_ROLE,
      [
        userId,
        role[0].id
      ]
    );

    await connection.commit();

    return {
      success: true,
      message: "User registered successfully",
      user_id: userId
    };

  } catch (err) {

    await connection.rollback();
    throw err;

  } finally {

    connection.release();

  }

};

// ======================================================
// LOGIN
// ======================================================

exports.login = async (data) => {

  validation.validateLogin(data);

  const { email, password } = data;

  const [rows] = await db.query(
    SQL.GET_USER_BY_EMAIL,
    [email]
  );

  if (!rows.length) {
    throw new Error("Invalid email or password");
  }

  const user = rows[0];

  if (user.is_deleted) {
    throw new Error("Account has been deleted");
  }

  if (user.status !== "active") {
    throw new Error("Account is not active");
  }

  const match = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!match) {
    throw new Error("Invalid email or password");
  }

  const [roles] = await db.query(
    SQL.GET_ROLES,
    [user.id]
  );

  const roleNames = roles.map(r => r.role_name);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roles: roleNames
    },
    process.env.JWT_SECRET || "zula_secret_key",
    {
      expiresIn: "24h"
    }
  );

  await db.query(
    SQL.UPDATE_LAST_LOGIN,
    [user.id]
  );

  return {

    success: true,

    token,

    user: {

      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      user_type: user.user_type,
      profile_image: user.profile_image,
      email_verified: user.email_verified,
      phone_verified: user.phone_verified,
      roles: roleNames

    }

  };

};

// ======================================================
// GET USERS
// ======================================================

exports.getAllUsers = async () => {

  const [rows] = await db.query(SQL.GET_USERS);

  return rows.map(user => ({

    ...user,

    roles: user.roles
      ? user.roles.split(",")
      : []

  }));

};

// ======================================================
// GET USER
// ======================================================

exports.getUser = async (id) => {

  const [rows] = await db.query(
    SQL.GET_USER,
    [id]
  );

  if (!rows.length) {
    throw new Error("User not found");
  }

  const user = rows[0];

  const [roles] = await db.query(
    SQL.GET_ROLES,
    [id]
  );

  user.roles = roles.map(r => r.role_name);

  return user;

};


// ======================================================
// UPDATE USER
// ======================================================

exports.updateUser = async (id, data) => {

  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    const {
      first_name,
      last_name,
      email,
      phone,
      status,
      user_type
    } = data;

    const [exists] = await connection.query(
      SQL.CHECK_EMAIL_EXISTS,
      [
        email,
        id
      ]
    );

    if (exists.length) {
      throw new Error("Email already exists");
    }

    const [result] = await connection.query(
      SQL.UPDATE_USER,
      [
        first_name,
        last_name,
        email,
        phone || null,
        user_type,
        status,
        id
      ]
    );

    if (!result.affectedRows) {
      throw new Error("User not found");
    }

    // Remove previous roles
    await connection.query(
      SQL.DELETE_USER_ROLES,
      [id]
    );

    // Find role
    const [role] = await connection.query(
      SQL.GET_ROLE,
      [user_type]
    );

    if (!role.length) {
      throw new Error("Role not found");
    }

    // Assign role
    await connection.query(
      SQL.ASSIGN_ROLE,
      [
        id,
        role[0].id
      ]
    );

    await connection.commit();

    return {
      success: true,
      message: "User updated successfully"
    };

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }

};
// ======================================================
// DELETE USER
// ======================================================

exports.deleteUser = async (id, deletedBy = null) => {

  const [result] = await db.query(
    SQL.SOFT_DELETE_USER,
    [
      deletedBy,
      id
    ]
  );

  if (!result.affectedRows) {
    throw new Error("User not found");
  }

  return {

    success: true,
    message: "User moved to recycle bin"

  };

};

// ======================================================
// RECYCLE BIN
// ======================================================

exports.getDeletedUsers = async () => {

  const [rows] = await db.query(
    SQL.GET_DELETED_USERS
  );

  return rows;

};

// ======================================================
// RESTORE USER
// ======================================================

exports.restoreUser = async (id) => {

  const [result] = await db.query(
    SQL.RESTORE_USER,
    [id]
  );

  if (!result.affectedRows) {
    throw new Error("User not found");
  }

  return {

    success: true,
    message: "User restored successfully"

  };

};

// ======================================================
// PERMANENT DELETE
// ======================================================

exports.forceDeleteUser = async (id) => {

  const [result] = await db.query(
    SQL.FORCE_DELETE_USER,
    [id]
  );

  if (!result.affectedRows) {
    throw new Error("User not found");
  }

  return {

    success: true,
    message: "User permanently deleted"

  };

};

// ======================================================
// DASHBOARD STATS
// ======================================================

exports.getDashboardStats = async () => {

  const [rows] = await db.query(
    SQL.GET_USER_STATS
  );

  return rows[0];

};