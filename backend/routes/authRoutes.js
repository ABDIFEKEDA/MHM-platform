const express = require("express");
const { register, login } = require("../controllers/authController.js");
const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/dashboard/patient", protect(["patient"]), (req, res) => {
  res.send("Patient Dashboard");
});

router.get("/dashboard/doctors", protect(["doctor"]), (req, res) => {
  res.send("Doctor Dashboard");
});

router.get("/dashboard/admin", protect(["admin"]), (req, res) => {
  res.send("Admin Dashboard");
});

module.exports = router;
