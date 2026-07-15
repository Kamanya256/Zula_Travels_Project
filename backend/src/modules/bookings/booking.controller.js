const service = require('./booking.service');

// =====================================
// CREATE BOOKING
// =====================================
exports.createBooking = async (req, res) => {
  try {

    const result = await service.createBooking({
      ...req.body,
      user_id: req.user.id
    });

    return res.status(201).json(result);

  } catch (error) {

    console.error('CREATE BOOKING ERROR:', error);

    return res.status(400).json({
      error: error.message
    });

  }
};

// =====================================
// CHECKOUT CART -> BOOKING
// =====================================
exports.checkoutBooking = async (req, res) => {
  try {

    const result = await service.checkoutBooking(
      req.user.id
    );

    return res.status(201).json(result);

  } catch (error) {

    console.error('CHECKOUT ERROR:', error);

    return res.status(400).json({
      error: error.message
    });

  }
};

// =====================================
// GET MY BOOKINGS
// =====================================
exports.getMyBookings = async (req, res) => {
  try {

    const bookings =
      await service.getMyBookings(
        req.user.id
      );

    return res.status(200).json(bookings);

  } catch (error) {

    console.error(
      'GET MY BOOKINGS ERROR:',
      error
    );

    return res.status(500).json({
      error: error.message
    });

  }
};

// =====================================
// GET BOOKING DETAILS
// =====================================
exports.getBookingDetails = async (req, res) => {
  try {

    const booking =
      await service.getBookingDetails(
        req.params.id,
        req.user.id
      );

    return res.status(200).json(booking);

  } catch (error) {

    console.error(
      'GET BOOKING DETAILS ERROR:',
      error
    );

    return res.status(400).json({
      error: error.message
    });

  }
};

// =====================================
// CANCEL BOOKING
// =====================================
exports.cancelBooking = async (req, res) => {
  try {

    const result =
      await service.cancelBooking(
        req.params.id,
        req.user.id
      );

    return res.status(200).json(result);

  } catch (error) {

    console.error(
      'CANCEL BOOKING ERROR:',
      error
    );

    return res.status(400).json({
      error: error.message
    });

  }
};

// =====================================
// ADMIN: GET ALL BOOKINGS
// =====================================
exports.getAllBookings = async (req, res) => {
  try {

    const bookings =
      await service.getAllBookings();

    return res.status(200).json(bookings);

  } catch (error) {

    console.error(
      'GET ALL BOOKINGS ERROR:',
      error
    );

    return res.status(500).json({
      error: error.message
    });

  }
};

// =====================================
// ADMIN: UPDATE STATUS
// =====================================
exports.updateBookingStatus = async (
  req,
  res
) => {
  try {

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: 'Status is required'
      });
    }

    const result =
      await service.updateBookingStatus(
        req.params.id,
        status
      );

    return res.status(200).json(result);

  } catch (error) {

    console.error(
      'UPDATE STATUS ERROR:',
      error
    );

    return res.status(400).json({
      error: error.message
    });

  }
};