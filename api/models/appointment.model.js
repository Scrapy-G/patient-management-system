const Joi = require("joi");
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    name: String,
  },
  patient: {
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    name: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "declined", "accepted"],
  },
  description: String,
  date: Date,
});

appointmentSchema.index({ date: 1 });
const Appointment = mongoose.model("Appoinment", appointmentSchema);

const validationSchema = Joi.object({
  doctor: Joi.objectId().required(),
  description: Joi.string().max(255),
  date: Joi.date().timestamp().required().min(new Date().setMonth(new Date().getMonth())),
});

module.exports = {
  Appointment,
  validationSchema,
};
