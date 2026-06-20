const router =
  require('express').Router();

const controller =
  require('./vendor-payout.controller');

const auth =
  require('../../middleware/auth.middleware');

router.post(
  '/',
  auth,
  controller.requestPayout
);

router.get(
  '/',
  auth,
  controller.getVendorPayouts
);

module.exports = router;