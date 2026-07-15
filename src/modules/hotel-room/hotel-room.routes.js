const express = require('express');
const router = express.Router();

const controller = require('./hotel-room.controller');

// Get rooms for a hotel
router.get(
  '/hotel/:hotelId',
  controller.getRoomsByHotel
);

// Get single room
router.get(
  '/:id',
  controller.getRoomById
);

module.exports = router;