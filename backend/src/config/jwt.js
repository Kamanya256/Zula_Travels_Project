const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET || "zula_travels_super_secret_key";

const JWT_EXPIRES = "7d";

exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};