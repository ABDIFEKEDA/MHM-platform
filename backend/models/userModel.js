const dbConnection = require("../dbConfig/dbConnection");

 const createUser = async (name, email, password, role, phone) => {
  const [results] = await dbConnection.query(
    "INSERT INTO users(name, email, password, role, phone) VALUES(?, ?, ?, ?, ?)",
    [name, email, password, role, phone]
  );
  return results.insertId;
};

 const findUserByEmail = async (email)=>{
    const [rows] = await dbConnection.query(
        "SELECT *FROM users WHERE email =?", [email]
    );
    return rows[0];
}

module.exports = { createUser, findUserByEmail };