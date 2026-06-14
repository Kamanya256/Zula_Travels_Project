const service =
  require('./vendor-report.service');

exports.getRevenueReport =
  async (req, res) => {

    try {

      const report =
        await service.getRevenueReport(
          req.user.vendor_id
        );

      res.json({
        success: true,
        data: report
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };