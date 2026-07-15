const service =
  require('./vendor-hotel.service');

exports.createHotel = async (req, res) => {

  try {

    const result =
      await service.createHotel(
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

exports.getMyHotels = async (req, res) => {

  try {

    const result =
      await service.getMyHotels(
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

exports.updateHotel = async (req, res) => {

  try {

    const result =
      await service.updateHotel(
        req.params.id,
        req.user.vendor_id,
        req.body
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

exports.deleteHotel = async (req, res) => {

  try {

    await service.deleteHotel(
      req.params.id,
      req.user.vendor_id
    );

    res.json({
      success: true,
      message: 'Hotel deleted'
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message
    });

  }

};