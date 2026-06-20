const router = require('express').Router();

const controller =
  require('./customer-booking.controller');

const auth =
  require('../../middleware/auth.middleware');

router.post(
  '/',
  auth,
  controller.createBooking
);

router.get(
  '/',
  auth,
  controller.getBookings
);

module.exports = router;