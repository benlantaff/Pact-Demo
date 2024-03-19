const router = require("express").Router();
const controller = require("./item.controller");

router.get("/item/:id", controller.getById);
router.get("/items", controller.getAll);

module.exports = router;
