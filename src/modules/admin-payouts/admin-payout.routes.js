const router =
  require('express').Router();

const controller =
  require('./admin-payout.controller');

const auth =
  require('../../middleware/auth.middleware');

router.get(
  '/',
  auth,
  controller.getAllPayouts
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

router.put(
  '/:id/complete',
  auth,
  controller.completePayout
);

module.exports = router;