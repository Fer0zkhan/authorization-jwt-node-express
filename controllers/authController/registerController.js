const User = require("../../models/User");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

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

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
