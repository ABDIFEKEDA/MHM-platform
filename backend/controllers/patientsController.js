const Patient = require("../models/patientsModel");
const PatientService = require("../services/patientService");

exports.createPatient = async (req, res) => {
  try {
    const id = await Patient.createPatient(req.body); 
    res.status(201).json({ message: "Patient created successfully", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addVitals = async (req, res) => {
  try {
    const { patientId } = req.params;
    await PatientService.addVitals(patientId, req.body); 
    res.json({ message: "Vitals added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVitals = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitals = await Patient.getVitals(patientId); 
    res.json(vitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
