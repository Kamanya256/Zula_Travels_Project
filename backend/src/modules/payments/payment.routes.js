const express = require('express');
const router = express.Router();

const controller = require('./payment.controller');
const auth = require('../../middleware/auth.middleware');

// =====================
// TEST ALL PAYMENTS
// =====================

router.get(
  '/',
  controller.getAllPayments
);

// =====================
// CREATE PAYMENT
// =====================

router.post(
  '/',
  auth,
  controller.createPayment
);

// =====================
// CONFIRM PAYMENT
// =====================

router.put(
  '/:id/confirm',
  auth,
  controller.confirmPayment
);

module.exports = router;