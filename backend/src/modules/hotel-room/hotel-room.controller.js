const service = require('./hotel-room.service');

// =====================================
// GET HOTEL ROOMS
// =====================================
exports.getRoomsByHotel = async (req, res) => {

  try {

    const rooms =
      await service.getRoomsByHotel(
        req.params.hotelId
      );

    res.json(rooms);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// =====================================
// GET SINGLE ROOM
// =====================================
exports.getRoomById = async (req, res) => {

  try {

    const room =
      await service.getRoomById(
        req.params.id
      );

    res.json(room);

  } catch (err) {

    res.status(404).json({
      error: err.message
    });

  }

};