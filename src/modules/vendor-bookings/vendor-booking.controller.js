const service =
  require('./vendor-booking.service');

/**
 * GET ALL BOOKINGS
 */
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

/**
 * GET BOOKING BY ID
 */
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

/**
 * APPROVE BOOKING
 */
exports.approveBooking =
  async (req, res) => {

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

/**
 * REJECT BOOKING
 */
exports.rejectBooking =
  async (req, res) => {

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

/**
 * CHECK IN GUEST
 */
exports.checkInGuest =
  async (req, res) => {

    try {

      const result =
        await service.updateBookingStatus(
          req.params.id,
          req.user.vendor_id,
          'checked_in'
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

/**
 * CHECK OUT GUEST
 */
exports.checkOutGuest =
  async (req, res) => {

    try {

      const result =
        await service.updateBookingStatus(
          req.params.id,
          req.user.vendor_id,
          'completed'
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

/**
 * GENERIC STATUS UPDATE
 */
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