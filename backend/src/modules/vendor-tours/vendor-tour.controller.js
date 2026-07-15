const service = require('./vendor-tour.service');

exports.getVendorTours = async (req, res) => {

  try {

    const tours =
      await service.getVendorTours(
        req.user.vendor_id
      );

    res.json({
      success: true,
      data: tours
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message
    });

  }

};

exports.createTour = async (req, res) => {

  try {

    const result =
      await service.createTour(
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

exports.getTourById = async (req, res) => {

  try {

    const tour =
      await service.getTourById(
        req.params.id,
        req.user.vendor_id
      );

    res.json({
      success: true,
      data: tour
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      error: error.message
    });

  }

};

exports.deleteTour = async (req, res) => {

  try {

    const result =
      await service.deleteTour(
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