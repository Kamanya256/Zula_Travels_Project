// ======================================================
// ZULA TRAVELS 2026
// USERS ROUTES
// ======================================================

const express = require("express");

const router = express.Router();

const controller = require("./users.controller");
const auth = require("../../middleware/auth.middleware");

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Register
router.post(
    "/register",
    controller.registerUser
);

// Login
router.post(
    "/login",
    controller.login
);

// ======================================================
// PROTECTED ROUTES
// ======================================================

// Current logged-in user
router.get(
    "/profile",
    auth,
    controller.profile
);

// Dashboard statistics
router.get(
    "/stats",
    auth,
    controller.getDashboardStats
);

// Recycle Bin
router.get(
    "/deleted",
    auth,
    controller.getDeletedUsers
);

// Restore user
router.put(
    "/restore/:id",
    auth,
    controller.restoreUser
);

// Permanent delete
router.delete(
    "/force/:id",
    auth,
    controller.forceDeleteUser
);

// List all users
router.get(
    "/",
    auth,
    controller.getAllUsers
);

// Single user
router.get(
    "/:id",
    auth,
    controller.getUser
);

// Update user
router.put(
    "/:id",
    auth,
    controller.updateUser
);

// Soft delete
router.delete(
    "/:id",
    auth,
    controller.deleteUser
);

module.exports = router;