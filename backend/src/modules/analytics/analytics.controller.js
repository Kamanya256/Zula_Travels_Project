const analyticsService = require("./analytics.service");

exports.getRevenueStats = async (req, res) => {
  try {
    const period = req.query.period || "monthly";

    const data = await analyticsService.getRevenueStats(period);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getBookingStats = async (req, res) => {
  try {
    const period = req.query.period || "monthly";

    const data = await analyticsService.getBookingStats(period);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};