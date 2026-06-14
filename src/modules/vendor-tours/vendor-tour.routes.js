const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./vendor-tour.controller');

router.get(
  '/',
  auth,
  controller.getVendorTours
);

router.post(
  '/',
  auth,
  controller.createTour
);

router.get(
  '/:id',
  auth,
  controller.getTourById
);

router.delete(
  '/:id',
  auth,
  controller.deleteTour
);

module.exports = router;