const User = require("../../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { sendTokenResponse } = require("../../utils/jwtUtils");

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isUserExits = await User.findOne({ email: email });

    if (!isUserExits) throw createError(404, "Invalid Credentials!");

    const isPasswordMatched = await bcrypt.compare(password, isUserExits.password);

    if (!isPasswordMatched) throw createError(404, "Invalid Credentials");

    sendTokenResponse(isUserExits, res, "User Login Successfully", 200);
  } catch (error) {
    next(error);
  }
};
