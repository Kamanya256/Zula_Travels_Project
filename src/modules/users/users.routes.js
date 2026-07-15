const express = require('express');
const router = express.Router();

const controller = require('./users.controller');
const auth = require('../../middleware/auth.middleware');

// AUTH
router.post('/register', controller.registerUser);
router.post('/login', controller.login);

// TEST PROTECTED
router.get('/profile', auth, (req, res) => {
    res.json({ message: 'Profile OK', user: req.user });
});

// ✅ ADD THIS (VERY IMPORTANT)
router.get('/customer-area', auth, (req, res) => {
    if (req.user.role !== 'customer') {
        return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ message: 'Welcome Customer 🎉' });
});

router.get('/admin-only', auth, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admins only' });
    }

    res.json({ message: 'Welcome Admin 🔐' });
});

module.exports = router;