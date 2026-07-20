const router =
    require("express").Router();


const controller =
    require("./generator.controller");

const auth =
    require("../../middleware/auth.middleware");



router.post(
    "/generate",
    auth,
    controller.generate
);



module.exports = router;