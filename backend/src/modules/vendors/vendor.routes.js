const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");

const controller = require("./vendor.controller");

// GET
router.get("/", auth, controller.getAll);

router.get("/:id", auth, controller.getOne);

// CREATE
router.post("/", auth, controller.create);

// UPDATE
router.put("/:id", auth, controller.update);

// CHANGE STATUS
router.put("/:id/status", auth, controller.changeStatus);

// DELETE
router.delete("/:id", auth, controller.remove);

module.exports = router;