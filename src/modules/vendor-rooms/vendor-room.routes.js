const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./vendor-room.controller');

router.get(
  '/',
  auth,
  controller.getVendorRooms
);

router.post(
  '/',
  auth,
  controller.createRoom
);

module.exports = router;