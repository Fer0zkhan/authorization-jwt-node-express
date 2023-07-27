const User = require("../../models/User");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const { sendTokenResponse } = require("../../utils/jwtUtils");

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isUserExits = await User.findOne({ email });

    if (isUserExits) throw createError(404, "Email ALready Exist!");

    const hashedPassword = await bcrypt.hashSync(
      password,
      Number(process.env.PASSWORD_SALT)
    );

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    sendTokenResponse(newUser, res, "User Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};
