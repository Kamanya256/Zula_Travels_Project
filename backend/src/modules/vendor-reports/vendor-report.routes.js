const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./vendor-report.controller');

router.get(
  '/revenue',
  auth,
  controller.getRevenueReport
);

module.exports = router;