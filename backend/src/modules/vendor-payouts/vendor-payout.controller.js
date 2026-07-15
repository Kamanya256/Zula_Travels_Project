const payoutService =
  require('./vendor-payout.service');

exports.requestPayout =
  async (req, res) => {

    try {

      const result =
        await payoutService.requestPayout(
          req.user.vendor_id,
          req.body
        );

      res.json({
        success: true,
        data: result
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };

exports.getVendorPayouts =
  async (req, res) => {

    try {

      const data =
        await payoutService.getVendorPayouts(
          req.user.vendor_id
        );

      res.json({
        success: true,
        data
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };