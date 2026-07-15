const express = require('express');
const router = express.Router();

const controller =
  require('./destination.controller');

// All destinations
router.get(
  '/',
  controller.getAllDestinations
);

// Hotels by destination
router.get(
  '/:id/hotels',
  controller.getHotelsByDestination
);

// Cars by destination
router.get(
  '/:id/cars',
  controller.getCarsByDestination
);

// Tours by destination
router.get(
  '/:id/tours',
  controller.getToursByDestination
);

// Full destination page
router.get(
  '/:id/overview',
  controller.getDestinationOverview
);

// Destination details
router.get(
  '/:id',
  controller.getDestinationById
);

module.exports = router;