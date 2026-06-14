const service =
  require('./vendor-booking.service');

exports.getBookings =
  async (req, res) => {

    try {

      const data =
        await service.getVendorBookings(
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

exports.approveBooking = async (req, res) => {

  try {

    const result =
      await service.approveBooking(
        req.params.id,
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

exports.rejectBooking = async (req, res) => {

  try {

    const result =
      await service.rejectBooking(
        req.params.id,
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
exports.getBookingById =
  async (req, res) => {

    try {

      const booking =
        await service.getBookingById(
          req.params.id,
          req.user.vendor_id
        );

      res.json({
        success: true,
        data: booking
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };

exports.updateBookingStatus =
  async (req, res) => {

    try {

      const result =
        await service.updateBookingStatus(
          req.params.id,
          req.user.vendor_id,
          req.body.status
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