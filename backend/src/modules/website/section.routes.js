const router =
    require("express").Router();


const controller =
    require("./section.controller");


const auth =
    require("../../middleware/auth.middleware");



// GET SECTIONS

router.get(

    "/pages/:pageId/sections",

    auth,

    controller.getPageSections

);



// CREATE SECTION

router.post(

    "/pages/:pageId/sections",

    auth,

    controller.createSection

);



// UPDATE SECTION

router.put(

    "/sections/:id",

    auth,

    controller.updateSection

);



// CHANGE STATUS

router.patch(

    "/sections/:id/status",

    auth,

    controller.updateStatus

);



// DELETE

router.delete(

    "/sections/:id",

    auth,

    controller.deleteSection

);


module.exports = router;