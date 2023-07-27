const router = require("express").Router();

const {
  loginController,
  registerController,
  logoutController,
} = require("../../controllers");
const { authenticateToken } = require("../../middleware");

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", authenticateToken, logoutController);

module.exports = router;
