const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header missing'
      });
    }

    // Safer split (avoids crashes on malformed headers)
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        error: 'Invalid authorization format (use Bearer token)'
      });
    }

    const token = parts[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token missing'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secretkey'
    );

    // Attach full user safely
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      vendor_id: decoded.vendor_id || null
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};