
const Router = require('express');
const {sendMessages, fetchMessages} = require("../controllers/messageController");

const messageRouter = Router();

// /api/messages/
messageRouter.post('/', sendMessages);
messageRouter.get('/', fetchMessages)

module.exports = messageRouter;