const adminService =
  require('./admin.service');

exports.getDashboard =
  async (req, res) => {

    try {

      const data =
        await adminService.getDashboard();

      return res.json({
        success: true,
        data
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        error: error.message
      });

    }

  };

exports.getPendingVendors =
  async (req, res) => {

    try {

      const data =
        await adminService.getPendingVendors();

      return res.json({
        success: true,
        data
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        error: error.message
      });

    }

  };

exports.approveVendor =
  async (req, res) => {

    try {

      await adminService.approveVendor(
        req.params.id
      );

      return res.json({
        success: true,
        message: 'Vendor approved successfully'
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };

exports.rejectVendor =
  async (req, res) => {

    try {

      await adminService.rejectVendor(
        req.params.id
      );

      return res.json({
        success: true,
        message: 'Vendor rejected successfully'
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };

exports.suspendVendor =
  async (req, res) => {

    try {

      await adminService.suspendVendor(
        req.params.id
      );

      return res.json({
        success: true,
        message: 'Vendor suspended successfully'
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        error: error.message
      });

    }

  };