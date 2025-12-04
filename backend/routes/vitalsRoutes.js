// const express = require("express");
// const vitalsRouter = express.Router();
// const { updateVitals, getVitals } = require("../models/patientModel");


// vitalsRouter.post("/:patientId/vitals", async (req, res) => {
//   try {
//     const patientId = req.params.patientId;
//     const vitals = req.body;

//     if (!vitals.bp_systolic || !vitals.bp_diastolic) {
//       return res.status(400).json({ error: "Blood pressure values are required" });
//     }

//     await updateVitals(patientId, vitals);
//     res.status(201).json({ message: "Vitals inserted successfully" });
//   } catch (err) {
//     console.error("Error inserting vitals:", err);
//     res.status(500).json({ error: "Failed to insert vitals" });
//   }
// });


// vitalsRouter.get("/:patientId/vitals", async (req, res) => {
//   try {
//     const patientId = req.params.patientId;
//     const vitals = await getVitals(patientId);
//     res.json(vitals);
//   } catch (err) {
//     console.error("Error fetching vitals:", err);
//     res.status(500).json({ error: "Failed to fetch vitals" });
//   }
// });

// module.exports = vitalsRouter;
