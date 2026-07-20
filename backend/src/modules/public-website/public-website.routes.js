const router =
    require("express").Router();


const controller =
    require("./public-website.controller");



// PUBLIC ROUTE
// NO LOGIN REQUIRED


router.get(

    "/:subdomain",

    controller.viewWebsite

);

router.get(

    "/:subdomain/page/:slug",

    controller.viewPage

);



module.exports =
    router;