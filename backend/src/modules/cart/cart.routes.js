const express = require('express');
const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./cart.controller');

router.post(
  '/',
  auth,
  controller.addToCart
);

router.get(
  '/',
  auth,
  controller.getCart
);

router.delete(
  '/:id',
  auth,
  controller.removeCartItem
);

module.exports = router;

router.post(
  '/checkout',
  auth,
  controller.checkoutCart
);