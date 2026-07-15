const authService = require("./auth.service");


// ========================
// REGISTER
// ========================

exports.register = async (req, res) => {

  try {

    const result =
      await authService.register(
        req.body
      );


    return res.status(201).json(result);


  } catch (error) {


    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};




// ========================
// LOGIN
// ========================

exports.login = async (req, res) => {


  try {


    const result =
      await authService.login(
        req.body
      );


    return res.status(200).json(result);



  } catch (error) {


    return res.status(401).json({

      success: false,

      message: error.message

    });


  }


};