const express = require("express");

const router = express.Router();

const controller =
  require("./payment.controller");

const auth =
  require("../../middleware/auth.middleware");


// ADMIN VIEW

router.get(
  "/",
  auth,
  controller.getAllPayments
);


// CUSTOMER CREATE PAYMENT

router.post(
  "/",
  auth,
  controller.createPayment
);



// CONFIRM PAYMENT
// (temporary testing gateway)

router.put(
  "/:id/confirm",
  auth,
  controller.confirmPayment
);



module.exports = router;