const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./vendor-booking.controller');

/**
 * GET ALL BOOKINGS FOR VENDOR
 */
router.get(
  '/',
  auth,
  controller.getBookings
);

/**
 * GET SINGLE BOOKING
 */
router.get(
  '/:id',
  auth,
  controller.getBookingById
);

/**
 * APPROVE BOOKING
 */
router.put(
  '/:id/approve',
  auth,
  controller.approveBooking
);

/**
 * REJECT BOOKING
 */
router.put(
  '/:id/reject',
  auth,
  controller.rejectBooking
);

/**
 * CHECK-IN GUEST
 */
router.put(
  '/:id/checkin',
  auth,
  controller.checkInGuest
);

/**
 * CHECK-OUT GUEST
 */
router.put(
  '/:id/checkout',
  auth,
  controller.checkOutGuest
);

/**
 * GENERIC STATUS UPDATE (optional fallback)
 */
router.put(
  '/:id/status',
  auth,
  controller.updateBookingStatus
);

module.exports = router;