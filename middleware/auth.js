const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Must match the secret used when signing
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = authenticateToken;
