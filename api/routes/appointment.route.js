const express = require("express");

const appointmentController = require("../controllers/appointment.controller");
const validate = require("../middleware/validate.middleware");
const { validationSchema } = require("../models/appointment.model");
const isAuth = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", isAuth, appointmentController.getAppointments);
router.post(
  "/",
  isAuth,
  validate(validationSchema),
  appointmentController.addAppointment
);
router.get("/:id/accept", isAuth, appointmentController.acceptAppointment);
router.get("/:id/decline", isAuth, appointmentController.declineAppointment);

module.exports = router;
