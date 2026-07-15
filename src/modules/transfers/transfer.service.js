const db = require('../../config/db');

// ===================================
// GET ALL TRANSFERS
// ===================================
exports.getAllTransfers = async () => {

  const [rows] = await db.query(`
    SELECT *
    FROM airport_transfers
    ORDER BY id DESC
  `);

  return rows;
};

// ===================================
// GET TRANSFER BY ID
// ===================================
exports.getTransferById = async (id) => {

  const [rows] = await db.query(`
    SELECT *
    FROM airport_transfers
    WHERE id = ?
  `, [id]);

  if (!rows.length) {
    throw new Error('Transfer not found');
  }

  return rows[0];
};

// ===================================
// GET TRANSFERS BY DESTINATION
// ===================================
exports.getTransfersByDestination = async (destinationId) => {

  const [rows] = await db.query(`
    SELECT *
    FROM airport_transfers
    WHERE destination_id = ?
  `, [destinationId]);

  return rows;
};