const router =
    require("express").Router();


const controller =
    require("./vendor-website.controller");


const auth =
    require("../../middleware/auth.middleware");



router.get(

    "/",

    auth,

    controller.getWebsite

);



router.put(

    "/branding",

    auth,

    controller.updateBranding

);



router.put(

    "/section/:id",

    auth,

    controller.updateSection

);



router.post(

    "/publish",

    auth,

    controller.publish

);



module.exports = router;