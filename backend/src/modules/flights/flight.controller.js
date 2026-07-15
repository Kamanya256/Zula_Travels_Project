const service = require('./flight.service');

// ======================================
// GET ALL FLIGHTS
// ======================================
exports.getAllFlights = async (req, res) => {
  try {

    const flights = await service.getAllFlights();

    res.json(flights);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// ======================================
// GET FLIGHT BY ID
// ======================================
exports.getFlightById = async (req, res) => {
  try {

    const flight = await service.getFlightById(
      req.params.id
    );

    res.json(flight);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};