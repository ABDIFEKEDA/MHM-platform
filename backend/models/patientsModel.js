const db = require("../dbConfig/dbConnection");
const { checkVitalsFromDB } = require("../services/alertService"); // ✅ import

const createPatient = async ({
  name,
  email,
  phone,
  age,
  pregnancy_stage,
  medical_history,
}) => {
  const [result] = await db.query(
    "INSERT INTO patients (name, email, phone, age, pregnancy_stage, medical_history) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, phone, age, pregnancy_stage, medical_history]
  );
  return result.insertId;
};

const findPatientById = async (id) => {
  const [rows] = await db.query("SELECT * FROM patients WHERE id = ?", [id]);
  return rows[0];
};

const updateVitals = async (
  patient_id,
  { bp_systolic, bp_diastolic, heart_rate, respiratory_rate, temperature, blood_sugar, hemoglobin, weight }
) => {
  await db.query(
    "INSERT INTO vitals (patient_id, bp_systolic, bp_diastolic, heart_rate, respiratory_rate, temperature, blood_sugar, hemoglobin, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      patient_id,
      bp_systolic,
      bp_diastolic,
      heart_rate,
      respiratory_rate,
      temperature,
      blood_sugar,
      hemoglobin,
      weight
    ]
  );

  // 🔔 After saving vitals, check for alerts
  await checkVitalsFromDB(patient_id);
};

const getVitals = async (id) => {
  const [rows] = await db.query("SELECT * FROM vitals WHERE patient_id = ?", [
    id,
  ]);
  return rows;
};

module.exports = {
  createPatient,
  findPatientById,
  updateVitals,
  getVitals
};
