// src/config/db.js
const mysql = require('mysql2/promise');
const config = require('./env');

// Create a MySQL connection pool using environment variables
const db = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

module.exports = db;