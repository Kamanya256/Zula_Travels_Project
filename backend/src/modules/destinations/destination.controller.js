const service = require('./destination.service');

// ======================================
// GET ALL DESTINATIONS
// ======================================
exports.getAllDestinations = async (req, res) => {
  try {

    const destinations =
      await service.getAllDestinations();

    res.json(destinations);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// ======================================
// GET DESTINATION DETAILS
// ======================================
exports.getDestinationById = async (req, res) => {
  try {

    const destination =
      await service.getDestinationById(
        req.params.id
      );

    res.json(destination);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};
// ======================================
// GET HOTELS BY DESTINATION
// ======================================
exports.getHotelsByDestination = async (req, res) => {
  try {

    const hotels =
      await service.getHotelsByDestination(
        req.params.id
      );

    res.json(hotels);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// ======================================
// GET CARS BY DESTINATION
// ======================================
exports.getCarsByDestination = async (req, res) => {
  try {

    const cars =
      await service.getCarsByDestination(
        req.params.id
      );

    res.json(cars);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// ======================================
// GET TOURS BY DESTINATION
// ======================================
exports.getToursByDestination = async (req, res) => {
  try {

    const tours =
      await service.getToursByDestination(
        req.params.id
      );

    res.json(tours);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// ======================================
// DESTINATION OVERVIEW
// ======================================
exports.getDestinationOverview = async (req, res) => {
  try {

    const data =
      await service.getDestinationOverview(
        req.params.id
      );

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};