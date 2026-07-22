const router =
    require("express").Router();


const controller =
    require("./editor.controller");


const auth =
    require("../../middleware/auth.middleware");



router.get(

    "/:websiteId/editor",

    auth,

    controller.getEditor

);



module.exports = router;