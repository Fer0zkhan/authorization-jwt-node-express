//Auth
const loginController = require("./authController/loginController");
const registerController = require("./authController/registerController");
const logoutController = require("./authController/logoutController");

//Book
const getAllBooksController = require("./bookController/getAllBooksController");
const createNewBook = require("./bookController/createNewBook");

//Refresh Token
const refreshTokenController = require("./refreshTokenController/refreshTokenController");

module.exports = {
  loginController,
  registerController,
  logoutController,
  getAllBooksController,
  refreshTokenController,
  createNewBook,
};
