const service =
  require('./admin-payout.service');

exports.getPayouts = async (req, res) => {

  try {

    const data =
      await service.getPayoutRequests();

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

exports.approvePayout = async (req, res) => {

  try {

    await service.approvePayout(
      req.params.id
    );

    res.json({
      success: true,
      message: 'Payout approved'
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message
    });

  }

};

exports.rejectPayout = async (req, res) => {

  try {

    await service.rejectPayout(
      req.params.id
    );

    res.json({
      success: true,
      message: 'Payout rejected'
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message
    });

  }

};