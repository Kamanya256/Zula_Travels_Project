const express = require('express');
const router = express.Router();

const bookingController =
    require('./booking.controller');

const auth =
    require('../../middleware/auth.middleware');

const role =
    require('../../middleware/role.middleware');

// ==========================================
// CUSTOMER ROUTES
// ==========================================

router.post(
    '/',
    auth,
    bookingController.createBooking
);

router.post(
    '/checkout',
    auth,
    bookingController.checkoutBooking
);

router.get(
    '/my-bookings',
    auth,
    bookingController.getMyBookings
);

router.get(
    '/:id',
    auth,
    bookingController.getBookingDetails
);

router.put(
    '/cancel/:id',
    auth,
    bookingController.cancelBooking
);

// ==========================================
// ADMIN ROUTES
// ==========================================

router.get(
    '/',
    auth,
    role('admin'),
    bookingController.getAllBookings
);

router.put(
    '/status/:id',
    auth,
    role('admin'),
    bookingController.updateBookingStatus
);

module.exports = router;