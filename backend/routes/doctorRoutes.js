const express = require('express');
const { createDoctor,getDoctors } = require('../controllers/doctorController');
const doctorRouter = express.Router();

doctorRouter.post('/createdoctors', createDoctor);
doctorRouter.get('/', getDoctors)

module.exports = doctorRouter;