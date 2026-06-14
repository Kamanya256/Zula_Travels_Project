const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./vendor-booking.controller');

router.get(
  '/',
  auth,
  controller.getBookings
);

router.put(
  '/:id/approve',
  auth,
  controller.approveBooking
);

router.put(
  '/:id/reject',
  auth,
  controller.rejectBooking
);

router.get(
  '/:id',
  auth,
  controller.getBookingById
);

router.put(
  '/:id/status',
  auth,
  controller.updateBookingStatus
);

module.exports = router;