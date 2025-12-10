const express = require("express");
const alertRouter = express.Router();
const {
  getPatientAlerts,
  getAlert,
  updateAlert,
  removeAlert,
} = require("../controllers/alertController");

const protect = require("../middleware/authMiddleware");

alertRouter.get("/patient/:patientId", protect, getPatientAlerts);

alertRouter.get("/:alertId", protect, getAlert);

alertRouter.put("/:alertId", protect, updateAlert);

alertRouter.delete("/:alertId", protect, removeAlert);

module.exports = alertRouter;
