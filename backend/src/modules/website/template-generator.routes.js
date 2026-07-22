const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");

const controller = require("./template-generator.controller");

router.post(
    "/:websiteId/generate",
    auth,
    controller.generateWebsite
);

module.exports = router;