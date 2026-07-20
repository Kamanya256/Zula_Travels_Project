const websiteService =
  require("./website.service");

// =====================================
// CREATE WEBSITE
// =====================================

exports.createWebsite =
  async (req, res) => {

    try {

      const vendorId =
        req.user.vendor_id;

      const website =
        await websiteService.createWebsite(
          req.user.id,
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Website created successfully.",
        data: website
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };


// =====================================
// GET MY WEBSITE
// =====================================

exports.getMyWebsite =
  async (req, res) => {

    try {

      const website =
        await websiteService.getMyWebsite(
          req.user.id,
          req.body
        );

      res.json({
        success: true,
        data: website
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };


// =====================================
// UPDATE WEBSITE
// =====================================

exports.updateWebsite =
  async (req, res) => {

    try {

      const result =
        await websiteService.updateWebsite(

          req.user.id,
          req.body
        );

      res.json({
        success: true,
        data: result
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };


// =====================================
// PUBLISH WEBSITE
// =====================================

exports.publishWebsite =
  async (req, res) => {

    try {

      const result =
        await websiteService.publishWebsite(

          req.user.id,
          req.body
        );

      res.json({
        success: true,
        data: result
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };


// =====================================
// SUSPEND WEBSITE
// =====================================

exports.suspendWebsite =
  async (req, res) => {

    try {

      const result =
        await websiteService.suspendWebsite(

          req.params.id,

          req.user.vendor_id

        );

      res.json({
        success: true,
        data: result
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };