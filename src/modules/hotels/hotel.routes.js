const express = require('express');
const router = express.Router();

const hotelController =
    require('./hotel.controller');

// =====================================
// PUBLIC ROUTES
// =====================================

// Get all hotels
router.get(
    '/',
    hotelController.getAllHotels
);

// Search hotels
router.get(
    '/search',
    hotelController.searchHotels
);

// Get single hotel
router.get(
    '/:id',
    hotelController.getHotelById
);

module.exports = router;