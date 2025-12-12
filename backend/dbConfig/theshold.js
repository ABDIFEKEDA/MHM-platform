const thresholds = {
  bp_systolic: { min: 90, max: 140 },
  bp_diastolic: { min: 60, max: 90 },
  heart_rate: { min: 60, max: 100 },
  respiratory_rate: { min: 12, max: 20 },
  temperature: { min: 36.0, max: 37.5 },
  blood_sugar: { min: 70, max: 140 },
  hemoglobin: { min: 12, max: 16 },
};

module.exports = thresholds;
