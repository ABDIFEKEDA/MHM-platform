const db = require("../dbConfig/dbConnection");

const insertVitals = async (patient_id, vitals) => {
  await db.query(
    "INSERT INTO vitals (patient_id, bp_systolic, bp_diastolic, heart_rate, respiratory_rate, temperature, blood_sugar, hemoglobin, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      patient_id,
      vitals.bp_systolic,
      vitals.bp_diastolic,
      vitals.heart_rate,
      vitals.respiratory_rate,
      vitals.temperature,
      vitals.blood_sugar,
      vitals.hemoglobin,
      vitals.weight,
    ]
  );
};

const getVitals = async (patientId) => {
  const [rows] = await db.query("SELECT * FROM vitals WHERE patient_id = ?", [patientId]);
  return rows;
};

module.exports = { insertVitals, getVitals };
