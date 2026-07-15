const service = require('./booking-item.service');

// ========================================
// ADD ITEM
// ========================================
exports.addItem = async (req, res, next) => {
    try {

        const result = await service.addItem(req.body);

        res.status(201).json(result);

    } catch (error) {
        next(error);
    }
};

// ========================================
// GET ITEMS
// ========================================
exports.getBookingItems = async (req, res, next) => {
    try {

        const items = await service.getBookingItems(
            req.params.bookingId
        );

        res.json(items);

    } catch (error) {
        next(error);
    }
};