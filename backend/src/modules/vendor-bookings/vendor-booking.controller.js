const service = require("./vendor-booking.service");
const dashboard =
  require("./vendor-booking.dashboard.service");



// ===============================
// GET ALL VENDOR BOOKINGS
// ===============================

exports.getBookings = async (req, res) => {

  try {


    const vendorId =
      req.user.vendor_id || null;


    const data =
      await service.getVendorBookings(
        vendorId
      );


    res.json({

      success: true,

      count: data.length,

      data

    });


  } catch (error) {

    res.status(400).json({

      success: false,

      error: error.message

    });

  }


};





// ===============================
// GET SINGLE BOOKING
// ===============================

exports.getBookingById =
  async (req, res) => {

    try {


      const data =
        await service.getBookingDetails(

          req.params.id,

          req.user.vendor_id || null

        );



      res.json({

        success: true,

        data

      });


    } catch (error) {


      res.status(400).json({

        success: false,

        error: error.message

      });


    }

  };





// ===============================
// APPROVE BOOKING
// ===============================

exports.approveBooking =
  async (req, res) => {


    try {


      const data =
        await service.approveBooking(

          req.params.id,

          req.user.vendor_id || null,

          req.user.id

        );



      res.json({

        success: true,

        data

      });


    } catch (error) {


      res.status(400).json({

        success: false,

        error: error.message

      });


    }



  };





// ===============================
// REJECT BOOKING
// ===============================

exports.rejectBooking =
  async (req, res) => {


    try {


      const data =
        await service.rejectBooking(

          req.params.id,

          req.user.vendor_id || null,

          req.user.id

        );



      res.json({

        success: true,

        data

      });


    } catch (error) {


      res.status(400).json({

        success: false,

        error: error.message

      });


    }



  };





// ===============================
// CHECK IN
// ===============================

exports.checkIn =
  async (req, res) => {


    try {


      const data =
        await service.checkInGuest(

          req.params.id,

          req.user.vendor_id || null,

          req.user.id

        );



      res.json({

        success: true,

        data

      });


    } catch (error) {

      res.status(400).json({

        success: false,

        error: error.message

      });


    }


  };





// ===============================
// CHECK OUT
// ===============================

exports.checkOut =
  async (req, res) => {


    try {


      const data =
        await service.checkOutGuest(

          req.params.id,

          req.user.vendor_id || null,

          req.user.id

        );



      res.json({

        success: true,

        data

      });


    } catch (error) {


      res.status(400).json({

        success: false,

        error: error.message

      });


    }


  };






// ===============================
// DASHBOARD
// ===============================

exports.dashboard =
  async (req, res) => {


    try {


      const vendorId =
        req.user.roles.includes("admin")
          ?
          null
          :
          req.user.vendor_id;



      const data =
        await dashboard.getDashboard(
          vendorId
        );



      res.json({

        success: true,

        data

      });


    } catch (error) {


      res.status(400).json({

        success: false,

        error: error.message

      });


    }



  };