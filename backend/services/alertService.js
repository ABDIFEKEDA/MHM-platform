const { createAlert, getAlertsByPatient } = require("../models/alertModel");

const checkVitalsFromDB = async (patientId, vitals) => {
  const { bp_systolic, bp_diastolic, heart_rate } = vitals;

  if (bp_systolic > 140 || bp_diastolic > 90) {
    await createAlert(patientId, "Blood Pressure", "High blood pressure detected", "high");
  }

  if (heart_rate < 60 || heart_rate > 100) {
    await createAlert(patientId, "Heart Rate", "Abnormal heart rate detected", "medium");
  }
};

module.exports = { checkVitalsFromDB, getAlertsByPatient };
