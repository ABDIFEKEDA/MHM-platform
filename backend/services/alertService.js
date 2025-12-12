const thresholds = require("../dbConfig/theshold");

function calculateAlerts(vitals) {
  const alerts = [];

  if (vitals.bp_systolic > thresholds.bp_systolic.max) {
    alerts.push({ type: "Blood Pressure", message: "Systolic too high", severity: "high" });
  }
  if (vitals.bp_diastolic > thresholds.bp_diastolic.max) {
    alerts.push({ type: "Blood Pressure", message: "Diastolic too high", severity: "high" });
  }
  if (vitals.heart_rate < thresholds.heart_rate.min || vitals.heart_rate > thresholds.heart_rate.max) {
    alerts.push({ type: "Heart Rate", message: "Abnormal heart rate", severity: "medium" });
  }
  if (vitals.temperature < thresholds.temperature.min || vitals.temperature > thresholds.temperature.max) {
    alerts.push({ type: "Temperature", message: "Abnormal temperature", severity: "medium" });
  }
  if (vitals.hemoglobin < thresholds.hemoglobin.min) {
    alerts.push({ type: "Hemoglobin", message: "Low hemoglobin", severity: "medium" });
  }

  return alerts;
}

module.exports = { calculateAlerts };
