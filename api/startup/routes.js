const express = require("express");
const cors = require("cors");

const userRouter = require("../routes/user.route");
const authRouter = require("../routes/auth.route");
const appointmentRouter = require("../routes/appointment.route");
const isAuth = require("../middleware/auth.middleware");
const error = require("../middleware/error.middleware");

module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use("/ping", (req, res) => res.send("Welcome to PatDoc"));
    app.use("/login", authRouter);
    app.use("/users", userRouter);
    app.use("/appointments", isAuth, appointmentRouter);
    app.use(error);
}