const { saveMessage, getMessages } = require("../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const { conversation_id, sender_id, sender_name, content, is_me = false } = req.body;

    if (!conversation_id || !sender_id || !content) {
      return res.status(400).json({ msg: "conversation_id, sender_id, and content are required!" });
    }

    const is_read = false;

    const message = {
      conversation_id,
      sender_id,
      sender_name,
      content,
      is_read,
      is_me,
    };

    const newId = await saveMessage(message);

    req.io.to(conversation_id.toString()).emit("newMessage", { ...message, id: newId });

    res.status(201).json({ msg: "Message sent successfully!", message: { ...message, id: newId } });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ msg: "Error sending message", error });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const { conversation_id } = req.params;  

    if (!conversation_id) {
      return res.status(400).json({ msg: "conversation_id is required!" });
    }

    const messages = await getMessages(conversation_id);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ msg: "Error fetching messages", error });
  }
};
module.exports = { sendMessage, fetchMessages };
