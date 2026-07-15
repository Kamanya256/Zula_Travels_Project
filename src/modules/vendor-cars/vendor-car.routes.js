const express = require('express');
const router = express.Router();

const controller =
  require('./vendor-car.controller');

const auth =
  require('../../middleware/auth.middleware');

router.get(
  '/',
  auth,
  controller.getMyCars
);

router.post(
  '/',
  auth,
  controller.createCar
);

module.exports = router;