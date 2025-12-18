const {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
  createDoctors,
} = require("../models/adminModel");

const addPatient = async (req, res) => {
  try {
    const { name, email, phone, age, pregnancy_stage, medical_history } =
      req.body;
    const id = await createPatient(
      name,
      email,
      phone,
      age,
      pregnancy_stage,
      medical_history
    );
    res.status(201).json({ message: "Patient added successfully", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listPatients = async (req, res) => {
  try {
    const patients = await getPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, age, pregnancy_stage, medical_history } =
      req.body;
    await updatePatient(
      id,
      name,
      email,
      phone,
      age,
      pregnancy_stage,
      medical_history
    );
    res.json({ message: "Patient updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePatient(id);
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
   res.status(500).json({msg:"onternal server error" ,err:err.message});
  }
};

const createDoctorrs = async (req, res) => {
  try {
    const { user_id, specialization, license_number, hospital, contact } =
      req.body;
    const id = await createDoctorrs(
      user_id,
      specialization,
      license_number,
      hospital,
      contact
    );
    res.status(201).json({ msg: "doctor created successffuly",id});
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err)
  }
};

module.exports = { addPatient, listPatients, editPatient, removePatient, createDoctorrs };
