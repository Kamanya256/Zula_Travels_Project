const paymentService = require('./payment.service');

// =====================
// GET ALL PAYMENTS
// =====================

exports.getAllPayments = async (req, res) => {
  try {

    const data =
      await paymentService.getAllPayments();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// =====================
// CREATE PAYMENT
// =====================

exports.createPayment = async (req, res) => {

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

// =====================
// CONFIRM PAYMENT
// =====================

exports.confirmPayment = async (req, res) => {

  try {

    const result =
      await paymentService.confirmPayment(
        req.params.id
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