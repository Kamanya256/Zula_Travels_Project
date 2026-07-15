// ======================================================
// ZULA TRAVELS 2026
// USERS CONTROLLER
// ======================================================

const service = require("./users.service");


// ======================================================
// REGISTER USER
// ======================================================

exports.registerUser = async (req, res) => {

  try {

    const result =
      await service.registerUser(req.body);

    return res.status(201).json(result);


  } catch (error) {

    console.error(
      "REGISTER USER:",
      error
    );


    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



// ======================================================
// LOGIN
// ======================================================

exports.login = async (req, res) => {

  try {

    const result =
      await service.login(req.body);


    return res.status(200).json(result);


  } catch (error) {

    console.error(
      "LOGIN:",
      error
    );


    return res.status(401).json({
      success: false,
      message: error.message
    });

  }

};



// ======================================================
// GET ALL USERS
// ======================================================

exports.getAllUsers = async (req, res) => {

  try {

    const users = await service.getAllUsers();

    return res.status(200).json({

      success: true,

      users

    });


  } catch (error) {

    console.error(
      "GET USERS:",
      error
    );


    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ======================================================
// GET SINGLE USER
// ======================================================

exports.getUser = async (req, res) => {


  try {


    const id =
      Number(req.params.id);



    if (!id) {

      return res.status(400).json({

        success: false,

        message: "Invalid user id"

      });

    }



    const user =
      await service.getUser(id);



    return res.status(200).json({

      success: true,

      user

    });



  } catch (error) {


    console.error(
      "GET USER:",
      error
    );


    return res.status(404).json({

      success: false,

      message: error.message

    });

  }

};




// ======================================================
// UPDATE USER
// ======================================================

exports.updateUser = async (req, res) => {


  try {


    const id =
      Number(req.params.id);



    if (!id) {

      return res.status(400).json({

        success: false,

        message: "Invalid user id"

      });

    }



    const result =
      await service.updateUser(
        id,
        req.body
      );



    return res.status(200).json(result);



  } catch (error) {


    console.error(
      "UPDATE USER:",
      error
    );


    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};




// ======================================================
// DELETE USER
// ======================================================

exports.deleteUser = async (req, res) => {


  try {


    const id =
      Number(req.params.id);



    const deletedBy =
      req.user
        ? req.user.id
        : null;



    const result =
      await service.deleteUser(
        id,
        deletedBy
      );



    return res.status(200).json(result);



  } catch (error) {


    console.error(
      "DELETE USER:",
      error
    );


    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};




// ======================================================
// RESTORE USER
// ======================================================

exports.restoreUser = async (req, res) => {


  try {


    const result =
      await service.restoreUser(
        Number(req.params.id)
      );


    return res.status(200).json(result);



  } catch (error) {


    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};




// ======================================================
// DELETED USERS
// ======================================================

exports.getDeletedUsers = async (req, res) => {


  try {


    const users =
      await service.getDeletedUsers();



    return res.status(200).json({

      success: true,

      users

    });



  } catch (error) {


    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};




// ======================================================
// FORCE DELETE
// ======================================================

exports.forceDeleteUser = async (req, res) => {


  try {


    const result =
      await service.forceDeleteUser(
        Number(req.params.id)
      );


    return res.status(200).json(result);



  } catch (error) {


    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};




// ======================================================
// USER STATISTICS
// ======================================================

exports.getDashboardStats = async (req, res) => {


  try {


    const stats =
      await service.getDashboardStats();



    return res.status(200).json({

      success: true,

      stats

    });



  } catch (error) {


    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};




// ======================================================
// PROFILE
// ======================================================

exports.profile = async (req, res) => {


  try {


    const user =
      await service.getUser(
        req.user.id
      );



    return res.status(200).json({

      success: true,

      user

    });



  } catch (error) {


    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};