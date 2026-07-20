// =====================================================
// ZULA TRAVELS 2026
// PAYMENT CONTROLLER
// =====================================================


const paymentService = require("./payment.service");


// =====================================================
// GET ALL PAYMENTS
// =====================================================

exports.getAllPayments = async (req, res) => {

  try {

    const data =
      await paymentService.getAllPayments();


    res.json({

      success: true,

      data

    });


  } catch (error) {


    res.status(500).json({

      success: false,

      error: error.message

    });

  }

};



// =====================================================
// CREATE PAYMENT
// =====================================================

exports.createPayment = async (req, res) => {


  try {


    const userId = req.user.id;


    const result =
      await paymentService.createPayment(
        userId,
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




// =====================================================
// CONFIRM PAYMENT
// =====================================================

exports.confirmPayment = async (req, res) => {


  try {


    const result =
      await paymentService.confirmPayment(
        req.params.id
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