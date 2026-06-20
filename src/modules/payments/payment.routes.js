const router = require('express').Router();

const controller =
  require('./payment.controller');

const auth =
  require('../../middleware/auth.middleware');

router.post(
  '/',
  auth,
  controller.createPayment
);

router.put(
  '/:id/confirm',
  auth,
  controller.confirmPayment
);

module.exports = router;