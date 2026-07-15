const service = require('./event.service');

exports.getAllEvents = async (req, res, next) => {
  try {
    const data = await service.getAllEvents();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const data = await service.getEventById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getEventsByDestination = async (req, res, next) => {
  try {
    const data = await service.getEventsByDestination(req.params.destinationId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};