const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./vendor-venues.controller');

router.post(
  '/',
  auth,
  controller.createVenue
);

router.get(
  '/',
  auth,
  controller.getVendorVenues
);

module.exports = router;