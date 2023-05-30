const mongoose = require("mongoose");

const { Appointment } = require("../models/appointment.model");
const { User } = require("../models/user.model");
const sendMail = require("../util/mail.util");

exports.getAppointments = async (req, res) => {
  const query = {};

  if (req.user.role == "patient")
    query["patient._id"] = new mongoose.Types.ObjectId(req.user._id);
  else query["doctor._id"] = new mongoose.Types.ObjectId(req.user._id);

  const category = req.query.category;

  if (category == "upcoming") {
    query["date"] = { $gte: new Date().toISOString() };
    query["status"] = "accepted";
  } else if (category == "history") {
    query["date"] = { $lte: new Date().toISOString() };
  } else if (category == "requests") {
    query["date"] = { $gte: new Date().toISOString() };
    query["status"] = { $ne: "accepted" };
  }

  const appointments = await Appointment.find(query).sort({ date: 1 });
  res.send(appointments);
};

exports.addAppointment = async (req, res) => {
  const doctor = await User.findOne({ role: "doctor", _id: req.body.doctor });

  if (!doctor)
    return res.status(400).send("Error: Doctor with given ID does not exist");

  const appointment = await Appointment.create({
    ...req.body,
    doctor,
    patient: req.user,
    date: req.body.date,
  });

  res.send(appointment);
};

exports.acceptAppointment = async (req, res) => {
  if (req.user.role !== "doctor")
    return res
      .status(401)
      .send("Error: You need to be a doctor to access this route");

  const appointment = await Appointment.findOne({
    _id: req.params.id,
    "doctor._id": req.user._id,
  });

  if (!appointment)
    return res.status(400).send("Error: Appointment with given ID not found");

  appointment.status = "accepted";
  await appointment.save();

  res.send(appointment);

  //send email
  const patient = await User.findById(appointment.patient._id);
  const data = {
    email: patient.email,
    name: patient.name,
    subject: "Patdoc - Your appointment was confirmed",
    message: `Your appointment request for ${new Date(
      appointment.date
    ).toUTCString()}, 
            with Dr. ${appointment.doctor.name} for ${appointment.description} 
            was accepted. Be well!`,
  };
  sendMail(data);
};

exports.declineAppointment = async (req, res) => {
  if (req.user.role !== "doctor")
    return res
      .status(401)
      .send("Error: You need to be a doctor to access this route");

  const appointment = await Appointment.findOne({
    _id: req.params.id,
    "doctor._id": req.user._id,
  });

  if (!appointment)
    return res.status(400).send("Error: Appointment with given ID not found");

  appointment.status = "declined";
  await appointment.save();
  res.send(appointment);

  //send email
  const patient = await User.findById(appointment.patient._id);
  const data = {
    email: patient.email,
    name: patient.name,
    subject: "Patdoc - Your appointment was DECLINED",
    message: `Your appointment request for ${new Date(
      appointment.date
    ).toUTCString()}, 
            with Dr. ${appointment.doctor.name} for ${appointment.description} 
            was DECLINED. Try requesting a different day!`,
  };
  sendMail(data);
};
