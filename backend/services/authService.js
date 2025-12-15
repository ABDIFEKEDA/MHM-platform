const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/userModel");
const generateTokens = require("../utils/generateTokens");

const registerUser = async ({ name, email, password, role, phone }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // createUser should insert and return the new user’s ID
  const userId = await createUser(
    name,
    email,
    hashedPassword,
    role || "patient",
    phone
  );

  // return full user object for controllers
  return { id: userId, name, email, role: role || "patient", phone };
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateTokens(user.id, user.role);
  return { token, role: user.role, name: user.name }; // ✅ include name
};

module.exports = { registerUser, loginUser };
