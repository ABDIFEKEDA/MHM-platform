const express = require("express");
const { saveNotification, getNotifications } = require("../models/notificationModel");
const router = express.Router();

// GET notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await getNotifications();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { user, type } = req.body;
    const time = new Date();

    await saveNotification(user, type, time);

    res.status(201).json({ message: "Notification saved successfully" });
  } catch (error) {
    console.error("Error saving notification:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
