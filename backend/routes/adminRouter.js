const express = require("express");
const { addPatient, listPatients, editPatient, removePatient , createDoctorrs} = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();



router.post("/", protect(["admin"]), addPatient);
router.get("/", protect(["admin"]), listPatients);
router.put("/:id", protect(["admin"]), editPatient);
router.delete("/:id", protect(["admin"]), removePatient);
router.post("/create", createDoctorrs)

module.exports = router;
