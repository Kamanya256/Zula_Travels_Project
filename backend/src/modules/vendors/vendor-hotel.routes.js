const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./vendor-hotel.controller');

router.post(
  '/',
  auth,
  controller.createHotel
);

router.get(
  '/',
  auth,
  controller.getMyHotels
);

router.put(
  '/:id',
  auth,
  controller.updateHotel
);

router.delete(
  '/:id',
  auth,
  controller.deleteHotel
);

module.exports = router;