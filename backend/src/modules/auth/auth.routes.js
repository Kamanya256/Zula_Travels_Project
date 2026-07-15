const router = require("express").Router();

const controller = require("./auth.controller");


// ========================
// PUBLIC AUTH ROUTES
// ========================


// Register
router.post(
    "/register",
    controller.register
);


// Login
router.post(
    "/login",
    controller.login
);


module.exports = router;