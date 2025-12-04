const Patient = require("../models/patientsModel");
const getVitals = require("../models/vitalsModels");
const AlertService = require("./alertService");

async function addVitals(patientId, vitals) {
  await Patient.getVitals(patientId, vitals);
  if (vitals.bp_systolic > 140 || vitals.bp_diastolic > 90) {
    await AlertService.createAlert(
      patientId,
      "High blood pressure detected → possible preeclampsia"
    );
  }
  if (vitals.blood_sugar > 200) {
    await AlertService.createAlert(
      patientId,
      "High blood sugar detected → possible gestational diabetes"
    );
  }
}

module.exports = { addVitals };
