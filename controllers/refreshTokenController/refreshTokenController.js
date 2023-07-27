const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { sendTokenResponse } = require("../../utils/jwtUtils");
const TokenBlacklist = require("../../models/TokenBlacklist");

module.exports = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: "Refresh token missing" });
  }

  try {
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const isBlacklisted = await TokenBlacklist.findOne({ refreshToken });
    
    if (isBlacklisted) {
      return res.status(401).json({ error: "Token has been revoked" });
    }
    
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create and send a new access token
    sendTokenResponse(user, res, "Token Refreshed", 200);
  } catch (err) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }
};
