const TokenBlacklist = require("../../models/TokenBlacklist");

module.exports = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: "Refresh token missing" });
  }

  try {
    // Blacklist the refresh token
    await TokenBlacklist.create({ token: refreshToken, expiresAt: new Date() });
    res.clearCookie("refreshToken"); // Remove the refresh token cookie

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
};
