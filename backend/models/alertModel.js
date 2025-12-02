const db = require("../dbConfig/dbConnection");

const createAlert = async (patientId, type, message, severity, status = "new") => {
  const [result] = await db.query(
    "INSERT INTO alerts (patient_id, type, message, severity, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
    [patientId, type, message, severity, status]
  );
  return result.insertId;
};

const getAlertsByPatient = async (patientId) => {
  const [rows] = await db.query("SELECT * FROM alerts WHERE patient_id = ?", [patientId]);
  return rows;
};

module.exports = { createAlert, getAlertsByPatient };
