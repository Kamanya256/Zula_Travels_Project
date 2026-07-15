const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./analytics.controller");

router.get("/revenue", auth, controller.getRevenueStats);
router.get("/bookings", auth, controller.getBookingStats);

module.exports = router;