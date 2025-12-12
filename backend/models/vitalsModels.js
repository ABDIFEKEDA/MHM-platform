const db = require("../dbConfig/dbConnection");
const { checkVitalsFromDB } = require("../services/alertService"); 


const insertVitals = async (patient_id, vitals) => {
  const {
    bp_systolic,
    bp_diastolic,
    heart_rate,
    respiratory_rate,
    temperature,
    blood_sugar,
    hemoglobin,
    weight,
  } = vitals;

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
      weight,
    ]
  );

 
  await checkVitalsFromDB(patient_id, vitals);
};

const getVitals = async (patientId) => {
  const [rows] = await db.query("SELECT * FROM vitals WHERE patient_id = ?", [patientId]);
  return rows;
};

module.exports = { insertVitals, getVitals };
