
const express = require("express");
const { createPatient, addVitals, getVitals, getPatients,getPatientStats, updatePatient } = require("../controllers/patientsController");
const patientRouter = express.Router();


patientRouter.post("/create", createPatient); 
patientRouter.post("/:patientId/vitals", addVitals); 
patientRouter.get("/:patientId/vitals", getVitals); 
patientRouter.get("/", getPatients);
patientRouter.get("/stats", getPatientStats);
patientRouter.put("/:id", updatePatient);

module.exports = patientRouter;
