const service =
  require('./vendor-room.service');

exports.getVendorRooms =
  async (req, res) => {

    try {

      const rooms =
        await service.getVendorRooms(
          req.user.vendor_id
        );

      res.json({
        success: true,
        data: rooms
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };

exports.createRoom =
  async (req, res) => {

    try {

      const room =
        await service.createRoom(
          req.user.vendor_id,
          req.body
        );

      res.status(201).json({
        success: true,
        data: room
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };