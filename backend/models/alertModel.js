const db = require("../dbConfig/dbConnection");


const createAlert = async (patientId, type, message, severity, status = "active") => {
  const [result] = await db.query(
    `INSERT INTO alerts 
      (patient_id, type, message, severity, status, created_at) 
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [patientId, type, message, severity, status]
  );
  return result.insertId;
};


const getAlertsByPatient = async (patientId) => {
  const [rows] = await db.query(
    "SELECT * FROM alerts WHERE patient_id = ? ORDER BY created_at DESC",
    [patientId]
  );
  return rows;
};


const updateAlertStatus = async (alertId, status) => {
  const [result] = await db.query(
    "UPDATE alerts SET status = ? WHERE id = ?",
    [status, alertId]
  );
  return result.affectedRows > 0;
};

module.exports = { createAlert, getAlertsByPatient, updateAlertStatus };
