const financeService =
  require('./vendor-finance.service');

exports.getDashboard =
  async (req, res) => {

    try {

      const data = await financeService.getVendorFinance(
        req.user.vendor_id
      );

      res.json({
        success: true,
        data
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }

  };