const express = require("express");

const router = express.Router();

const controller = require("./vendor-dashboard.controller");

const auth = require("../../middleware/auth.middleware");



router.get(
    "/",
    auth,
    controller.dashboard
);



module.exports = router;