const router = require('express').Router();

const auth =
  require('../../middleware/auth.middleware');

const controller =
  require('./admin.controller');

router.get(
  '/dashboard',
  auth,
  controller.getDashboard
);

router.get(
  '/vendors/pending',
  auth,
  controller.getPendingVendors
);

router.put(
  '/vendors/:id/approve',
  auth,
  controller.approveVendor
);

router.put(
  '/vendors/:id/reject',
  auth,
  controller.rejectVendor
);

router.put(
  '/vendors/:id/suspend',
  auth,
  controller.suspendVendor
);

module.exports = router;