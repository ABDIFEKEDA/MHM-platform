const Patient = require("../models/patientsModel");
const PatientService = require("../services/patientService");

exports.createPatient = async (req, res) => {
  try {
    console.log("Incoming patient data:", req.body); 
    const id = await Patient.createPatient(req.body);
    res.status(201).json({ message: "Patient created successfully", id });
  } catch (err) {
    console.error("Error creating patient:", err);
    res.status(400).json({ error: err.message }); 
  }
};

exports.addVitals = async (req, res) => {
  try {
    const { patientId } = req.params;
    await PatientService.addVitals(patientId, req.body);
    res.json({ message: "Vitals added successfully" });
  } catch (err) {
    console.error("Error adding vitals:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.getVitals = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitals = await Patient.getVitals(patientId);
    res.json(vitals);
  } catch (err) {
    console.error("Error fetching vitals:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.getAllPatients();
    console.log("Fetched patients:", patients); 
    res.json(patients || []);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};
exports.getPatientStats = async (req, res) => {
  try {
    const stats = await Patient.getPatientStats();
    res.json(stats);
  } catch (err) {
    console.error("Error fetching patient stats:", err);
    res.status(500).json({ error: "Failed to fetch patient stats" });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, age, pregnancy_stage, medical_history } = req.body;

    await db.query(
      "UPDATE patients SET name=?, email=?, phone=?, age=?, pregnancy_stage=?, medical_history=? WHERE id=?",
      [name, email, phone, age, pregnancy_stage, medical_history, id]
    );

    res.json({ message: "Patient updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating patient", error: err.message });
  }
};