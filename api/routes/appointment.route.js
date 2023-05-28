const express = require("express");

const appointmentController = require("../controllers/appointment.controller");
const validate = require("../middleware/validate.middleware");
const { validationSchema } = require("../models/appointment.model");

const router = express.Router();

router.get("/", appointmentController.getAppointments);
router.post("/", validate(validationSchema), appointmentController.addAppointment);
router.get("/:id/accept", appointmentController.acceptAppointment);
router.get("/:id/decline", appointmentController.declineAppointment);

module.exports = router;