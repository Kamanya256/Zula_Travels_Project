const express = require('express');
const router = express.Router();

const controller = require('./booking-item.controller');

router.post(
    '/',
    controller.addItem
);

router.get(
    '/booking/:bookingId',
    controller.getBookingItems
);

module.exports = router;