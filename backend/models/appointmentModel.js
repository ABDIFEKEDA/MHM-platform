
const db = require('../dbConfig/dbConnection');

const createAppointment = async (data) => {
  const { patient_id, name, email, appointment_date, reason } = data;
  const sql =
    'INSERT INTO appointments(patient_id, name, email, appointment_date, reason) VALUES(?, ?, ?, ?, ?)';
  const [results] = await db.query(sql, [
    patient_id,
    name,
    email,
    appointment_date,
    reason,
  ]);
  return results;
};

module.exports = createAppointment;
