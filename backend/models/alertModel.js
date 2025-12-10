const db = require("../dbConfig/dbConnection");

// Create new alert
const createAlert = async (patientId, type, message, severity, status = "active") => {
  const [result] = await db.query(
    `INSERT INTO alerts 
      (patient_id, type, message, severity, status, created_at) 
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [patientId, type, message, severity, status]
  );
  return result.insertId;
};

// Get all alerts for a patient
const getAlertsByPatient = async (patientId) => {
  const [rows] = await db.query(
    "SELECT * FROM alerts WHERE patient_id = ? ORDER BY created_at DESC",
    [patientId]
  );
  return rows;
};

// Get single alert by ID
const getAlertById = async (alertId) => {
  const [rows] = await db.query(
    "SELECT * FROM alerts WHERE id = ?",
    [alertId]
  );
  return rows[0];
};


const updateAlertStatus = async (alertId, status) => {
  const [result] = await db.query(
    "UPDATE alerts SET status = ? WHERE id = ?",
    [status, alertId]
  );
  return result.affectedRows > 0;
};


const deleteAlert = async (alertId) => {
  const [result] = await db.query(
    "DELETE FROM alerts WHERE id = ?",
    [alertId]
  );
  return result.affectedRows > 0;
};

module.exports = { 
  createAlert, 
  getAlertsByPatient, 
  getAlertById, 
  updateAlertStatus, 
  deleteAlert 
};
