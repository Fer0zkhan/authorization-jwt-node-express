const jwt = require("jsonwebtoken");
const User = require("../models/User");
const TokenBlacklist = require("../models/TokenBlacklist");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: "Refresh token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Check if the token is blacklisted
    const isBlacklisted = await TokenBlacklist.findOne({ refreshToken });

    if (isBlacklisted) {
      return res.status(401).json({ error: "Token has been revoked" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: "Access denied, User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) {
  //     return res.status(403).json({ error: "Invalid token" });
  //   }

  //   req.user = user;
  //   next();
  // });
};
