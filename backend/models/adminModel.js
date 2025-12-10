const db = require("../dbConfig/dbConnection");

// Create patient
const createPatient = async (name, email, phone, age, pregnancy_stage, medical_history) => {
  const [result] = await db.query(
    "INSERT INTO patients (name, email, phone, age, pregnancy_stage, medical_history) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, phone, age, pregnancy_stage, medical_history]
  );
  return result.insertId;
};

// Get all patients
const getPatients = async () => {
  const [rows] = await db.query("SELECT * FROM patients");
  return rows;
};

// Update patient
const updatePatient = async (id, name, email, phone, age, pregnancy_stage, medical_history) => {
  await db.query(
    "UPDATE patients SET name=?, email=?, phone=?, age=?, pregnancy_stage=?, medical_history=? WHERE id=?",
    [name, email, phone, age, pregnancy_stage, medical_history, id]
  );
};

// Delete patient
const deletePatient = async (id) => {
  await db.query("DELETE FROM patients WHERE id=?", [id]);
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient };
