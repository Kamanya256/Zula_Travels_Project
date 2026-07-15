const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./admin.controller");

// ====================================
// DASHBOARD
// ====================================
router.get("/stats", auth, controller.getDashboardStats);
router.get("/charts/revenue", auth, controller.getRevenueChart);

// ====================================
// VENDOR MANAGEMENT
// ====================================

// Get pending vendors
router.get(
    "/vendors/pending",
    auth,
    controller.getPendingVendors
);

// Approve vendor
router.put(
    "/vendors/:id/approve",
    auth,
    controller.approveVendor
);

// Reject vendor
router.put(
    "/vendors/:id/reject",
    auth,
    controller.rejectVendor
);

// Suspend vendor
router.put(
    "/vendors/:id/suspend",
    auth,
    controller.suspendVendor
);

module.exports = router;