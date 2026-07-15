const service =
  require('./vendor-car.service');

exports.getMyCars =
  async (req, res) => {

    try {

      const data =
        await service.getMyCars(
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

exports.createCar =
  async (req, res) => {

    try {

      const data =
        await service.createCar(
          req.user.vendor_id,
          req.body
        );

      res.status(201).json({
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