const express = require("express");
const alertRouter = express.Router();
const { getPatientAlerts } = require("../controllers/alertController");
const protect = require("../middleware/authMiddleware"); 

alertRouter.get("/:patientId", protect, getPatientAlerts);

module.exports = alertRouter;
