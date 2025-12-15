const { saveMessages, getMessages } = require("../models/messageModel");

const sendMessages = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const time = new Date();
    if(!sender || !content){
        res.status(400).json("All Fields are required !")
    }
    await saveMessages(sender, receiver, content, time);
    req.io.to(receiver).emit("newMessage", { sender, content, time });
    res.status(201).json({ msg: "message send succesfully !" });
  } catch (error) {
    res.status(500).json({ msg: "error sending messages:", error });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await getMessages(sender, receiver);
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error fetching messages", error: error.messages });
  }
};
module.exports = { sendMessages, fetchMessages };
