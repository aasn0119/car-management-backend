const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization");

  // If the token is not present in the header, send a 404 with 'invalid grant'
  if (!token) {
    return res.json({ status: 404, message: "invalid grant" });
  }

  try {
    // Remove 'Bearer ' and verify the token
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    // Attach the user info to the request object
    req.user = verified;

    // Move to the next middleware
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 400 with 'Invalid Token'
    return res.status(400).json({ status: 400, message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
