const express = require('express');

const router = express.Router();

const controller =
    require('./restaurant.controller');

// =====================================
// ROUTES
// =====================================

router.get(
    '/',
    controller.getAllRestaurants
);

router.get(
    '/:id',
    controller.getRestaurantById
);

router.get(
    '/destination/:id',
    controller.getRestaurantsByDestination
);

module.exports = router;