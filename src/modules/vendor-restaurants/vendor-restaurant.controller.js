const service =
  require('./vendor-restaurant.service');

exports.getVendorRestaurants =
  async (req, res) => {

    try {

      const data =
        await service.getVendorRestaurants(
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

exports.createRestaurant =
  async (req, res) => {

    try {

      const result =
        await service.createRestaurant(
          req.user.vendor_id,
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