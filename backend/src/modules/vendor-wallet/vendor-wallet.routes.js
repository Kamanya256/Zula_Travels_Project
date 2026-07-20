const express = require("express");

const router = express.Router();

const auth =
    require("../../middleware/auth.middleware");


const controller =
    require("./vendor-wallet.controller");



router.get(

    "/",

    auth,

    controller.getWallet

);



module.exports = router;