const express = require("express");
const { addPatient, listPatients, editPatient, removePatient } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Admin-only patient management
router.post("/", protect(["admin"]), addPatient);
router.get("/patientslist", protect(["admin"]), listPatients);
router.put("/:id", protect(["admin"]), editPatient);
router.delete("/:id", protect(["admin"]), removePatient);

module.exports = router;
