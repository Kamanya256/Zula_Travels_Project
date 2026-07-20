const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../../middleware/auth.middleware");

const controller =
  require("./website.controller");


// =====================================
// CREATE WEBSITE
// =====================================

router.post(
  "/",
  auth,
  controller.createWebsite
);


// =====================================
// GET MY WEBSITE
// =====================================

router.get(
  "/me",
  auth,
  controller.getMyWebsite
);


// =====================================
// UPDATE WEBSITE
// =====================================

router.put(
  "/:id",
  auth,
  controller.updateWebsite
);


// =====================================
// PUBLISH WEBSITE
// =====================================

router.put(
  "/:id/publish",
  auth,
  controller.publishWebsite
);


// =====================================
// SUSPEND WEBSITE
// =====================================

router.put(
  "/:id/suspend",
  auth,
  controller.suspendWebsite
);

module.exports =
  router;