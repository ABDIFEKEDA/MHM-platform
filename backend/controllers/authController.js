const { registerUser, loginUser } = require("../services/authService.js");
const { saveNotification } = require("../models/notificationModel"); 

const register = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);

    const notif = {
      type: "register",
      user: newUser.name,   
      time: new Date()
    };


    await saveNotification(notif.user, notif.type, notif.time);

    
    req.io.to("adminRoom").emit("adminNotification", notif);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, role, name } = await loginUser(req.body);

    const notif = {
      type: "login",
      user: name,   
      time: new Date()
    };

    await saveNotification(notif.user, notif.type, notif.time);
    req.io.to("adminRoom").emit("adminNotification", notif);

    res.json({ token, role, name });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
