const dbConnection = require("../dbConfig/dbConnection");

const createDoctor = async ({ user_id, specialization, license_number, hospital, contact }) => {
  const [result] = await dbConnection.query(
    "INSERT INTO doctors (user_id, specialization, license_number, hospital, contact) VALUES (?, ?, ?, ?, ?)",
    [user_id, specialization, license_number, hospital, contact]
  );
  return result.insertId; 
};

module.exports = { createDoctor };
