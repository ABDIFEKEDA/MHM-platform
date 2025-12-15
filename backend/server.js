const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const dbConnection = require('./dbConfig/dbConnection');
const authRoutes = require('./routes/authRoutes');
 const patientRouter = require('./routes/patientRoutes')
const morgan = require('morgan');
const alerRouter = require('./routes/alertRouter');
const patientRoutes = require('./routes/patientRoutes');
const notificationRouter = require('./routes/notificationRouter')
const messageRouter = require('./routes/messageRouter');

const app = express();

const cors = require('cors');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000", 
    methods: ["GET", "POST"]
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  
  socket.on("joinAdminRoom", () => {
    socket.join("adminRoom");
    console.log("Admin joined notification room");
  });
});

const port = 4000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

app.use('/api/auth', authRoutes);
app.use('/api',patientRouter);
app.use("/api/notifications", notificationRouter)
app.use('/api/messages',messageRouter);

app.use("/api/alerts", alerRouter);
app.use("/api/patients", patientRoutes);

app.get("/", (req, res) => {
  res.send("Maternal Health Monitoring API running...");
});

server.listen(port, () => {
  console.log(`Server with Socket.IO running on port ${port}`);
});
module.exports = app;