const service = require('./restaurant.service');

// =====================================
// GET ALL
// =====================================
exports.getAllRestaurants = async (req, res, next) => {

    try {

        const data = await service.getAllRestaurants();

        res.json(data);

    } catch (err) {

        next(err);

    }
};

// =====================================
// GET BY ID
// =====================================
exports.getRestaurantById = async (req, res, next) => {

    try {

        const data =
            await service.getRestaurantById(
                req.params.id
            );

        res.json(data);

    } catch (err) {

        next(err);

    }
};

// =====================================
// GET BY DESTINATION
// =====================================
exports.getRestaurantsByDestination =
    async (req, res, next) => {

        try {

            const data =
                await service.getRestaurantsByDestination(
                    req.params.id
                );

            res.json(data);

        } catch (err) {

            next(err);

        }
    };