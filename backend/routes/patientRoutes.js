
const express = require("express");
const { createPatient, addVitals, getVitals } = require("../controllers/patientsController");
const patientRouter = express.Router();

patientRouter.post("/patients", createPatient); 
patientRouter.post("/:patientId/vitals", addVitals); 
patientRouter.get("/:patientId/vitals", getVitals); 

module.exports = patientRouter;
