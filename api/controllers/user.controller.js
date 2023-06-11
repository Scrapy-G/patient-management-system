const bcrypt = require("bcrypt");

const { User } = require("../models/user.model");
const { Appointment } = require("../models/appointment.model");
const sendMail = require("../util/mail.util");

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find(req.query).select("-password -ipAddress");
  res.send(users);
};

exports.updateMe = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
    new: true,
  });
  res.send(user);
};

exports.addUser = async (req, res) => {
  const emailTaken = await User.exists({
    email: req.body.email.toLowerCase(),
  });
  if (emailTaken) return res.status(400).send("Error: email already taken");

  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    email: req.body.email.toLowerCase(),
    password: passwordHash,
    ipAddress: req.socket.remoteAddress,
  });

  res.send({ name: user.name, email: user.email });
};

exports.deleteMe = async (req, res) => {
  if (req.user.role !== "patient")
    return res.status(403).send("Doctors cannot delete their accounts");

  await Appointment.deleteMany({ "patient._id": req.user._id });
  await User.deleteOne({ _id: req.user._id });
  res.status(204).send();

  const data = {
    email: req.user.email,
    name: req.user.name,
    subject: "Patdoc - Account deleted",
    message: `Your account was successfully deleted. Feel free to sign up again if you need to.`,
  };
  sendMail(data);
};
