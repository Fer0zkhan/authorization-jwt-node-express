const loginController = require("./authController/loginController");
const registerController = require("./authController/registerController");
const getAllBooksController = require("./bookController/getAllBooksController");

module.exports = {
  loginController,
  registerController,
  getAllBooksController,
};
