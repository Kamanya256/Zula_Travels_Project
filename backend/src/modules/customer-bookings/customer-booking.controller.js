const service = require('./customer-booking.service');

exports.createBooking = async (req, res) => {
  try {

    const result =
      await service.createBooking(
        req.user.id,
        req.body
      );

    res.json({
      success: true,
      data: result
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      error: err.message
    });

  }
};

exports.getBookings = async (req, res) => {
  try {

    const result =
      await service.getCustomerBookings(
        req.user.id
      );

    res.json({
      success: true,
      data: result
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      error: err.message
    });

  }
};