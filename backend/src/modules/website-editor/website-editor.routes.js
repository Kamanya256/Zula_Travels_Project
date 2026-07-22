const express = require("express");

const router = express.Router();

const controller =
    require("./website-editor.controller");


const auth =
    require("../../middleware/auth.middleware");



// Vendor website editor

router.get(

    "/",

    auth,

    controller.getEditor

);



// Update website settings

router.put(

    "/settings",

    auth,

    controller.updateSettings

);



// Update sections

router.put(

    "/sections/:sectionId",

    auth,

    controller.updateSection

);



module.exports = router;