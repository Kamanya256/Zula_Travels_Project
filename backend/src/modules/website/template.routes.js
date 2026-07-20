const router = require("express").Router();

const controller =
    require("./template.controller");

const auth =
    require("../../middleware/auth.middleware");



router.get(
    "/",
    auth,
    controller.getTemplates
);



router.post(
    "/apply",
    auth,
    controller.applyTemplate
);



module.exports = router;