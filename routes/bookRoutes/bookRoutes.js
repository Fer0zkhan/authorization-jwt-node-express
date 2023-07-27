const { getAllBooksController, createNewBook } = require("../../controllers");
const { authenticateToken } = require("../../middleware");

const router = require("express").Router();

router.get("/all", authenticateToken, getAllBooksController);
router.post("/create", authenticateToken, createNewBook);

module.exports = router;
