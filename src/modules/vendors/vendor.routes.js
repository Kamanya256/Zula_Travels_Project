const express = require('express');
const router = express.Router();

const controller =
    require('./vendor.controller');

const auth =
    require('../../middleware/auth.middleware');

router.post(
    '/register',
    controller.registerVendor
);

router.get(
    '/dashboard',
    auth,
    controller.getDashboard
);

module.exports = router;