const router =
    require("express").Router();


const controller =
    require("./website-preview.controller");

const auth =
    require("../../middleware/auth.middleware");



router.get(

    "/website/:id",

    auth,

    controller.preview

);



module.exports = router;