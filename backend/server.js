const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const dbConnection = require('./dbConfig/dbConnection');
const authRoutes = require('./routes/authRoutes');
 const patientRouter = require('./routes/patientRoutes')
const morgan = require('morgan');
const alerRouter = require('./routes/alertRouter');
const patientRoutes = require('./routes/patientRoutes');



const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

app.use('/api/auth', authRoutes);
app.use('/api',patientRouter);


app.use("/api/alerts", alerRouter);
app.use("/api/patients", patientRoutes);

app.get("/", (req, res) => {
  res.send("Maternal Health Monitoring API running...");
});

app.listen(port, ()=>{
    console.log(`server is running on the port ${port}`);
})
module.exports = app;