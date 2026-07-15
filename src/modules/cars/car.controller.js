const service = require('./car.service');

// ======================================
// GET ALL CARS
// ======================================
exports.getAllCars = async (req, res) => {
  try {

    const cars = await service.getAllCars();

    res.json(cars);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// ======================================
// GET CAR BY ID
// ======================================
exports.getCarById = async (req, res) => {
  try {

    const car = await service.getCarById(
      req.params.id
    );

    res.json(car);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};