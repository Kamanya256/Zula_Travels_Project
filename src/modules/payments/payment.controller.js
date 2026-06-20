const paymentService = require('./payment.service');

exports.createPayment = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;

    const {
      booking_id,
      payment_method
    } = req.body;

    const result =
      await paymentService.createPayment(
        booking_id,
        userId,
        payment_method
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

exports.confirmPayment = async (
  req,
  res
) => {

  try {

    const paymentId =
      req.params.id;

    const result =
      await paymentService.confirmPayment(
        paymentId
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