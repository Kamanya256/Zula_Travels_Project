const adminService = require("./admin.service");

// ========================================
// DASHBOARD
// ========================================

exports.getDashboardStats = async (req, res) => {
  try {
    const data = await adminService.getDashboardStats();

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ========================================
// REVENUE CHART
// ========================================

exports.getRevenueChart = async (req, res) => {
  try {
    const period = req.query.period || "monthly";

    const data =
      await adminService.getRevenueChartData(period);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ========================================
// PENDING VENDORS
// ========================================

exports.getPendingVendors = async (req, res) => {
  try {

    const vendors =
      await adminService.getPendingVendors();

    return res.status(200).json({
      success: true,
      data: vendors,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ========================================
// APPROVE
// ========================================

exports.approveVendor = async (req, res) => {
  try {

    await adminService.approveVendor(req.params.id);

    return res.json({
      success: true,
      message: "Vendor approved successfully",
    });

  } catch (err) {

    return res.status(400).json({
      success: false,
      message: err.message,
    });

  }
};

// ========================================
// REJECT
// ========================================

exports.rejectVendor = async (req, res) => {
  try {

    await adminService.rejectVendor(req.params.id);

    return res.json({
      success: true,
      message: "Vendor rejected successfully",
    });

  } catch (err) {

    return res.status(400).json({
      success: false,
      message: err.message,
    });

  }
};

// ========================================
// SUSPEND
// ========================================

exports.suspendVendor = async (req, res) => {
  try {

    await adminService.suspendVendor(req.params.id);

    return res.json({
      success: true,
      message: "Vendor suspended successfully",
    });

  } catch (err) {

    return res.status(400).json({
      success: false,
      message: err.message,
    });

  }
};