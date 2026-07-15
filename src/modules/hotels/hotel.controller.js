const hotelService = require('./hotel.service');

// =====================================
// GET ALL HOTELS
// =====================================
exports.getAllHotels = async (req, res) => {

  try {

    const hotels =
      await hotelService.getAllHotels();

    res.json(hotels);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// =====================================
// GET HOTEL BY ID
// =====================================
exports.getHotelById = async (req, res) => {

  try {

    const hotel =
      await hotelService.getHotelById(
        req.params.id
      );

    res.json(hotel);

  } catch (error) {

    res.status(404).json({
      error: error.message
    });

  }

};

// =====================================
// SEARCH HOTELS
// =====================================
exports.searchHotels = async (req, res) => {

  try {

    const hotels =
      await hotelService.searchHotels(
        req.query.keyword || ''
      );

    res.json(hotels);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};