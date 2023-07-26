const { getAllBooksController } = require("../../controllers");

const router = require("express").Router();

router.get("/all", getAllBooksController);

module.exports = router;
