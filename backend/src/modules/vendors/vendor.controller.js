const service = require("./vendor.service");

// =========================
// GET ALL
// =========================
exports.getAll = async (req, res) => {

  try {

    const vendors = await service.getAll();

    res.json(vendors);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

// =========================
// GET ONE
// =========================
exports.getOne = async (req, res) => {

  try {

    const vendor = await service.getOne(req.params.id);

    res.json(vendor);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

// =========================
// CREATE
// =========================
exports.create = async (req, res) => {

  try {

    const id = await service.create(req.body);

    res.status(201).json({
      success: true,
      vendor_id: id
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

// =========================
// UPDATE
// =========================
exports.update = async (req, res) => {

  try {

    await service.update(req.params.id, req.body);

    res.json({
      success: true,
      message: "Vendor updated"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

// =========================
// STATUS
// =========================
exports.changeStatus = async (req, res) => {

  try {

    await service.changeStatus(
      req.params.id,
      req.body.status
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

// =========================
// DELETE
// =========================
exports.remove = async (req, res) => {

  try {

    await service.remove(req.params.id);

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};