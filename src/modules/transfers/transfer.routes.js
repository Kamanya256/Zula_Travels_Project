const express = require('express');
const router = express.Router();

const controller =
  require('./transfer.controller');

router.get(
  '/',
  controller.getAllTransfers
);

router.get(
  '/destination/:destinationId',
  controller.getTransfersByDestination
);

router.get(
  '/:id',
  controller.getTransferById
);

module.exports = router;