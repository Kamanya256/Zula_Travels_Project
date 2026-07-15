const express = require('express');
const router = express.Router();

const controller = require('./car.controller');

// ======================================
// GET ALL CARS
// ======================================
router.get(
  '/',
  controller.getAllCars
);

// ======================================
// GET CAR BY ID
// ======================================
router.get(
  '/:id',
  controller.getCarById
);

module.exports = router;