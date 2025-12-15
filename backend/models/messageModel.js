const dbConnection = require("../dbConfig/dbConnection");

const saveMessages = async (sender, receiver, content, time) => {
  try {
    await dbConnection.query(
      "INSERT INTO messages(sender, receiver, content, time) VALUES(?, ?, ?, ?)",
      [sender, receiver, content, time]
    );
    console.log("Message Saved:", sender, "->", receiver, content);
  } catch (error) {
    console.log("error saving messages :", error);
  }
};

const getMessages = async (sender, receiver) => {
  try {
    const [rows] = await dbConnection.query(
      "SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY time ASC",
      [sender, receiver, receiver, sender]
    );
    return rows;
  } catch (error) {
    console.log("error fetching messages : ", error);
    return [];
  }
};
module.exports = { saveMessages, getMessages };
