const db = require("../dbConfig/dbConnection");
const { checkVitalsFromDB } = require("../services/alertService"); // optional alert logic


const createPatient = async ({ name, email, phone, age, pregnancy_stage, medical_history }) => {
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


// const updateVitals = async (patient_id, vitals) => {
//   const {
//     bp_systolic,
//     bp_diastolic,
//     heart_rate,
//     respiratory_rate,
//     temperature,
//     blood_sugar,
//     hemoglobin,
//     weight,
//   } = vitals;

//   await db.query(
//     "INSERT INTO vitals (patient_id, bp_systolic, bp_diastolic, heart_rate, respiratory_rate, temperature, blood_sugar, hemoglobin, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
//     [
//       patient_id,
//       bp_systolic,
//       bp_diastolic,
//       heart_rate,
//       respiratory_rate,
//       temperature,
//       blood_sugar,
//       hemoglobin,
//       weight,
//     ]
//   );

//   // optional: trigger alerts
//   await checkVitalsFromDB(patient_id);
// };

// Get vitals for patient
const getVitals = async (id) => {
  const [rows] = await db.query("SELECT * FROM vitals WHERE patient_id = ?", [id]);
  return rows;
};

module.exports = {
  createPatient,
  findPatientById,
  getVitals,
};
