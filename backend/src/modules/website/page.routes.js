const router =
    require("express").Router();


const controller =
    require("./page.controller");


const auth =
    require("../../middleware/auth.middleware");



router.get(
    "/:websiteId/pages",
    auth,
    controller.getPages
);



router.post(
    "/:websiteId/pages",
    auth,
    controller.createPage
);



module.exports = router;