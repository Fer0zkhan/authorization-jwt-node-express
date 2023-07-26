const User = require("../../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isUserExits = await User.findOne({ email: email });

    if (!isUserExits) throw createError(404, "Invalid Credentials!");

    const isPasswordMatched = await bcrypt.compare(password, isUserExits.password);

    if (!isPasswordMatched) throw createError(404, "Invalid Credentials");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User has been login successfully",
      data: isUserExits,
    });
  } catch (error) {
    next(error);
  }
};
