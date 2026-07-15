const express = require('express');
const router = express.Router();

const controller = require('./event.controller');

router.get('/', controller.getAllEvents);

router.get(
  '/destination/:destinationId',
  controller.getEventsByDestination
);

router.get('/:id', controller.getEventById);

module.exports = router;