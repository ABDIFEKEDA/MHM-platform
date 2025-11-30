const jwt = require("jsonwebtoken");

const generateTokens = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateTokens;
