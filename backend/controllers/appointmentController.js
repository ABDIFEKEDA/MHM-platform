const appointment = require("../models/appointmentModel");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const appointmentController = {
  createAppointment: async (req, res) => {
    const data = req.body;

    try {
      const result = await appointment(data);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Appointment Confirmation",
        text: `Hello ${data.name}, your appointment is scheduled on ${data.appointment_date}. Reason: ${data.reason}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Appointment created but email failed" });
        } else {
          res.status(201).json({
            message: "Appointment created and email sent",
            appointmentId: result.insertId,
          });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getAppointmentsByEmail: async (req, res) => {
    const email = req.params.email;

    try {
      const results = await Appointment.getByEmail(email);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllAppointments: async (req, res) => {
    try {
      const results = await Appointment.getAll();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = appointmentController;
