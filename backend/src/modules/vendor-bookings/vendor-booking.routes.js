const router = require("express").Router();

const controller =
  require("./vendor-booking.controller");

const auth =
  require("../../middleware/auth.middleware");



router.get(
  "/",
  auth,
  controller.getBookings
);



router.get(
  "/dashboard",
  auth,
  controller.dashboard
);



router.get(
  "/:id",
  auth,
  controller.getBookingById
);



router.put(
  "/:id/approve",
  auth,
  controller.approveBooking
);



router.put(
  "/:id/reject",
  auth,
  controller.rejectBooking
);



router.put(
  "/:id/checkin",
  auth,
  controller.checkIn
);



router.put(
  "/:id/checkout",
  auth,
  controller.checkOut
);



module.exports = router;