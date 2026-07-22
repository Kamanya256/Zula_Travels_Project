const router =
    require("express").Router();


const controller =
    require("./section.controller");


const auth =
    require("../../middleware/auth.middleware");




// =====================================
// GET ALL SECTIONS OF PAGE
// =====================================

router.get(

    "/pages/:pageId/sections",

    auth,

    controller.getPageSections

);




// =====================================
// GET SINGLE SECTION
// =====================================

router.get(

    "/sections/:id",

    auth,

    controller.getSection

);




// =====================================
// CREATE SECTION
// =====================================

router.post(

    "/pages/:pageId/sections",

    auth,

    controller.createSection

);




// =====================================
// UPDATE SECTION CONTENT
// =====================================

router.put(

    "/sections/:id",

    auth,

    controller.updateSection

);




// =====================================
// CHANGE VISIBILITY STATUS
// =====================================

router.patch(

    "/sections/:id/status",

    auth,

    controller.updateStatus

);




// =====================================
// DELETE SECTION
// =====================================

router.delete(

    "/sections/:id",

    auth,

    controller.deleteSection

);




// =====================================
// REORDER PAGE SECTIONS
// =====================================

router.put(

    "/pages/:pageId/sections/reorder",

    auth,

    controller.reorderSections

);



module.exports = router;