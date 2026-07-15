const service = require('./transfer.service');

// ===================================
// GET ALL
// ===================================
exports.getAllTransfers = async (req, res, next) => {
  try {
    const data = await service.getAllTransfers();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// ===================================
// GET ONE
// ===================================
exports.getTransferById = async (req, res, next) => {
  try {
    const data = await service.getTransferById(
      req.params.id
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// ===================================
// GET BY DESTINATION
// ===================================
exports.getTransfersByDestination = async (req, res, next) => {
  try {
    const data =
      await service.getTransfersByDestination(
        req.params.destinationId
      );

    res.json(data);
  } catch (error) {
    next(error);
  }
};