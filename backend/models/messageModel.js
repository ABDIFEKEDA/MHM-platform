const dbConnection = require("../dbConfig/dbConnection");

const saveMessage = async (message) => {
  const {
    conversation_id,
    sender_id,
    sender_name,
    content,
    is_read,
    is_me,
  } = message;

  try {
    await dbConnection.query(
      `INSERT INTO messages (conversation_id, sender_id, sender_name, content, is_read, is_me)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [conversation_id, sender_id, sender_name, content, is_read, is_me]
    );
    console.log("Message Saved:", sender_name, "->", content);
  } catch (error) {
    console.error("Error saving message:", error);
  }
};


const getMessages = async (conversation_id) => {
  try {
    const [rows] = await dbConnection.query(
      `SELECT * FROM messages 
       WHERE conversation_id = ? 
       ORDER BY created_at ASC`,
      [conversation_id]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

module.exports = { saveMessage, getMessages };
