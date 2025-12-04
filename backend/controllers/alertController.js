const { getAlertsByPatient } = require("../services/alertService");

const getPatientAlerts = async (req, res) => {
  try {
    const { patientId } = req.params;
    const alerts = await getAlertsByPatient(patientId);
    res.json(alerts);   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPatientAlerts };
