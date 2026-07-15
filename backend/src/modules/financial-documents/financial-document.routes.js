const router =
  require('express').Router();

const controller =
  require('./financial-document.controller');

const auth =
  require('../../middleware/auth.middleware');

router.get(
  '/',
  auth,
  controller.getMyDocuments
);

module.exports = router;