const express = require('express');

const router = express.Router();

const controller = require('./flight.controller');

// ======================================
// PUBLIC ROUTES
// ======================================

// Get all flights
router.get(
  '/',
  controller.getAllFlights
);

// Get flight details
router.get(
  '/:id',
  controller.getFlightById
);

module.exports = router;