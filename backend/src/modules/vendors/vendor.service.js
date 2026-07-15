const db = require("../../config/db");

// =========================
// GET ALL VENDORS
// =========================
exports.getAll = async () => {
  const [rows] = await db.query(`
    SELECT *
    FROM vendors
    ORDER BY id DESC
  `);

  return rows;
};

// =========================
// GET ONE
// =========================
exports.getOne = async (id) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM vendors
    WHERE id=?
    `,
    [id]
  );

  return rows[0];
};

// =========================
// CREATE
// =========================
exports.create = async (vendor) => {

  const {
    name,
    company_name,
    email,
    phone,
    business_type,
    commission_rate,
    address,
    description,
    website,
    logo,
    registration_number,
    tax_number
  } = vendor;

  const [result] = await db.query(
    `
    INSERT INTO vendors
    (
      name,
      company_name,
      email,
      phone,
      business_type,
      commission_rate,
      address,
      description,
      website,
      logo,
      registration_number,
      tax_number
    )
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      company_name,
      email,
      phone,
      business_type,
      commission_rate,
      address,
      description,
      website,
      logo,
      registration_number,
      tax_number
    ]
  );

  return result.insertId;
};

// =========================
// UPDATE
// =========================
exports.update = async (id, vendor) => {

  await db.query(
    `
    UPDATE vendors
    SET
      name=?,
      company_name=?,
      email=?,
      phone=?,
      business_type=?,
      commission_rate=?,
      address=?,
      description=?,
      website=?,
      logo=?,
      registration_number=?,
      tax_number=?
    WHERE id=?
    `,
    [
      vendor.name,
      vendor.company_name,
      vendor.email,
      vendor.phone,
      vendor.business_type,
      vendor.commission_rate,
      vendor.address,
      vendor.description,
      vendor.website,
      vendor.logo,
      vendor.registration_number,
      vendor.tax_number,
      id
    ]
  );

  return true;
};

// =========================
// CHANGE STATUS
// =========================
exports.changeStatus = async (id, status) => {

  await db.query(
    `
    UPDATE vendors
    SET status=?
    WHERE id=?
    `,
    [status, id]
  );

  return true;
};

// =========================
// DELETE
// =========================
exports.remove = async (id) => {

  await db.query(
    `
    DELETE
    FROM vendors
    WHERE id=?
    `,
    [id]
  );

  return true;
};