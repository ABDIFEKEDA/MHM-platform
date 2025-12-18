const express = require('express');
const appointmentRouter = express.Router();
const appointmentController = require('../controllers/appointmentController');

appointmentRouter.post('/appointments', appointmentController.createAppointment);
appointmentRouter.get('/appointments/:email', appointmentController.getAppointmentsByEmail);
appointmentRouter.get('/appointments', appointmentController.getAllAppointments);

module.exports = appointmentRouter;
