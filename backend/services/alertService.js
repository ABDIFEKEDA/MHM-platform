// src/services/alertService.js
const sendAlert = async (patientId, message) => {
  try {
    // Here you could:
    // 1. Save alert to database
    // 2. Send email/SMS notification
    console.log(`Alert for patient ${patientId}: ${message}`);

    // Example: insert into alerts table (optional)
    // await db.query("INSERT INTO alerts (patient_id, message) VALUES (?, ?)", [patientId, message]);

    return true;
  } catch (error) {
    console.error("Error sending alert:", error);
    throw error;
  }
};

// Export the function
module.exports = {
  sendAlert,
};
