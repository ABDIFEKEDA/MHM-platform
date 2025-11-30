const { registerUser, loginUser } = require("../services/authService.js"); 

 const register = async (req, res) => {
  try {
    const userId = await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", name: req.body.name });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

 const login = async (req, res) => {
  try {
    const { token, role } = await loginUser(req.body);
    res.json({ token, role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
