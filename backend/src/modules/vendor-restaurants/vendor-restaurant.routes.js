const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./vendor-restaurant.controller');

router.get(
  '/',
  auth,
  controller.getVendorRestaurants
);

router.post(
  '/',
  auth,
  controller.createRestaurant
);

module.exports = router;