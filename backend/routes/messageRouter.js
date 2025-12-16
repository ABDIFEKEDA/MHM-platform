
const Router = require('express');
const {sendMessage, fetchMessages} = require("../controllers/messageController");

const messageRouter = Router();


messageRouter.post('/', sendMessage);
messageRouter.get('/conversation_id', fetchMessages)

module.exports = messageRouter;