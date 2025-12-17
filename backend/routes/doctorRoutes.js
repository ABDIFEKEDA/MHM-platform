const express = require('express');
const { createDoctor } = require('../controllers/doctorController');
const doctorRouter = express.Router();

doctorRouter.post('/createdoctors', createDoctor);

module.exports = doctorRouter;