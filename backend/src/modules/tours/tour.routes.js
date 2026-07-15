const express = require('express');

const router = express.Router();

const controller = require('./tour.controller');

// ======================================
// PUBLIC ROUTES
// ======================================

// GET ALL TOURS
router.get(
    '/',
    controller.getAllTours
);

// GET TOUR DETAILS
router.get(
    '/:id',
    controller.getTourById
);

module.exports = router;