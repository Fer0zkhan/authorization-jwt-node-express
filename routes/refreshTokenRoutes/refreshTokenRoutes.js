const router = require("express").Router();
const { refreshTokenController } = require("../../controllers");

router.get("/", refreshTokenController);

module.exports = router;
