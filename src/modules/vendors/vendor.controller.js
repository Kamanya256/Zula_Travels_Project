const service =
  require('./vendor.service');

exports.registerVendor =
  async (req, res) => {

    try {

      const result =
        await service.registerVendor(
          req.body
        );

      res.status(201).json({
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

exports.dashboard = async (req, res) => {

  try {

    const result =
      await service.getDashboard(
        req.user.vendor_id
      );

    res.json(result);

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }

};

exports.registerVendor = async (req, res) => {

  console.log('REGISTER VENDOR HIT');

  try {
    const result = await service.registerVendor(req.body);

    res.status(201).json({
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
exports.getDashboard = async (req, res) => {
  try {

    const providerId = req.user.vendor_id;

    const dashboard =
      await service.getDashboard(providerId);

    res.json({
      success: true,
      data: dashboard
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message
    });

  }
};
exports.getDashboard = async (req, res) => {

  try {

    const result =
      await service.getDashboard(
        req.user.vendor_id
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