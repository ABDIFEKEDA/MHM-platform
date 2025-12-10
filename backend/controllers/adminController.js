const {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("../models/adminModel");

// Add patient
const addPatient = async (req, res) => {
  try {
    const { name, email, phone, age, pregnancy_stage, medical_history } = req.body;
    const id = await createPatient(name, email, phone, age, pregnancy_stage, medical_history);
    res.status(201).json({ message: "Patient added successfully", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List patients
const listPatients = async (req, res) => {
  try {
    const patients = await getPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit patient
const editPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, age, pregnancy_stage, medical_history } = req.body;
    await updatePatient(id, name, email, phone, age, pregnancy_stage, medical_history);
    res.json({ message: "Patient updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete patient
const removePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePatient(id);
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addPatient, listPatients, editPatient, removePatient };
