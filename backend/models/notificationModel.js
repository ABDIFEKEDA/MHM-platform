
const dbConnection = require("../dbConfig/dbConnection");

const saveNotification = async (user, type, time) => {
  await dbConnection.query(
    "INSERT INTO notifications (user, type, time) VALUES (?, ?, ?)",
    [user, type, time]
  );
};

const getNotifications = async () => {
  const [rows] = await dbConnection.query(
    "SELECT * FROM notifications ORDER BY time DESC LIMIT 50"
  );
  return rows;
};

module.exports = { saveNotification, getNotifications };
