const express = require("express");
const vitalsRouter = express.Router();
const { updateVitals, getVitals } = require("../models/patientModel");
const { checkVitalsFromDB } = require("../services/alertService");  // <-- import

// Insert vitals and auto-generate alerts
vitalsRouter.post("/:patientId/vitals", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const vitals = req.body;

    if (!vitals.bp_systolic || !vitals.bp_diastolic) {
      return res.status(400).json({ error: "Blood pressure values are required" });
    }

    // Save vitals
    await updateVitals(patientId, vitals);

    // Check vitals and create alerts if needed
    await checkVitalsFromDB(patientId, vitals);

    res.status(201).json({ message: "Vitals inserted and alerts checked successfully" });
  } catch (err) {
    console.error("Error inserting vitals:", err);
    res.status(500).json({ error: "Failed to insert vitals" });
  }
});

// Fetch vitals for a patient
vitalsRouter.get("/:patientId/vitals", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const vitals = await getVitals(patientId);
    res.json(vitals);
  } catch (err) {
    console.error("Error fetching vitals:", err);
    res.status(500).json({ error: "Failed to fetch vitals" });
  }
});

module.exports = vitalsRouter;
