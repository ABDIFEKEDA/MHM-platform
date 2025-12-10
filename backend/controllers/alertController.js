const { 
  getAlertsByPatient, 
  getAlertById, 
  updateAlertStatus, 
  deleteAlert 
} = require("../services/alertService");


const getPatientAlerts = async (req, res) => {
  try {
    const { patientId } = req.params;
    const alerts = await getAlertsByPatient(patientId);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAlert = async (req, res) => {
  try {
    const { alertId } = req.params;
    const alert = await getAlertById(alertId);

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateAlert = async (req, res) => {
  try {
    const { alertId } = req.params;
    const { status } = req.body;

    const updated = await updateAlertStatus(alertId, status);
    if (!updated) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.json({ message: "Alert updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete alert
const removeAlert = async (req, res) => {
  try {
    const { alertId } = req.params;
    const deleted = await deleteAlert(alertId);

    if (!deleted) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.json({ message: "Alert deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPatientAlerts, getAlert, updateAlert, removeAlert };
