const router =
  require('express').Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./admin-payout.controller');

router.get(
  '/',
  auth,
  controller.getPayouts
);

router.put(
  '/:id/approve',
  auth,
  controller.approvePayout
);

router.put(
  '/:id/reject',
  auth,
  controller.rejectPayout
);

module.exports = router;