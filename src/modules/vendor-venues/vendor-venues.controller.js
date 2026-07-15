const service = require('./vendor-venues.service');

exports.createVenue = async (req, res) => {

  try {

    const result =
      await service.createVenue(
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

exports.getVendorVenues = async (req, res) => {

  try {

    const result =
      await service.getVendorVenues(
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