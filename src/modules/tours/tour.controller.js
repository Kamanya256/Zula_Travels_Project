const service = require('./tour.service');

// ======================================
// GET ALL TOURS
// ======================================
exports.getAllTours = async (req, res) => {
    try {

        const tours = await service.getAllTours();

        res.json(tours);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};

// ======================================
// GET TOUR BY ID
// ======================================
exports.getTourById = async (req, res) => {
    try {

        const tour = await service.getTourById(
            req.params.id
        );

        res.json(tour);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};