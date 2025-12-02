const express = require("express");
const alerRouter = express.Router();
const { getPatientAlerts } = require("../controllers/alertController");
const protect = require("../middleware/authMiddleware");

alerRouter.get("/:patientId", protect, getPatientAlerts);

module.exports = alerRouter;
