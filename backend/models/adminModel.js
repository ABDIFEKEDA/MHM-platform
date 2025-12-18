const dbConnection = require("../dbConfig/dbConnection");
const db = require("../dbConfig/dbConnection");


const createPatient = async (
  name,
  email,
  phone,
  age,
  pregnancy_stage,
  medical_history
) => {
  const [result] = await db.query(
    "INSERT INTO patients (name, email, phone, age, pregnancy_stage, medical_history) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, phone, age, pregnancy_stage, medical_history]
  );
  return result.insertId;
};

const getPatients = async () => {
  const [rows] = await db.query("SELECT * FROM patients");
  return rows;
};

const updatePatient = async (
  id,
  name,
  email,
  phone,
  age,
  pregnancy_stage,
  medical_history
) => {
  await db.query(
    "UPDATE patients SET name=?, email=?, phone=?, age=?, pregnancy_stage=?, medical_history=? WHERE id=?",
    [name, email, phone, age, pregnancy_stage, medical_history, id]
  );
};

// Delete patient
const deletePatient = async (id) => {
  await db.query("DELETE FROM patients WHERE id=?", [id]);
};

const createDoctors = async ({
  user_id,
  specialization,
  license_number,
  hospital,
  contact,
}) => {
  const [result] = await dbConnection.query(
    `INSERT INTO doctors(user_id, specialization, license_number, hospital, contact ) VALUSE(?, ?, ?, ?, ?)`,
    [user_id, specialization, license_number, hospital, contact]
  );
  return result.insertId;
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient, createDoctors };
