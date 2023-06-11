const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["doctor", "patient"],
    required: true,
  },
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  address: String,
  ipAddress: String,
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role, name: this.name, email: this.email },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);

const validationSchema = Joi.object({
  name: Joi.string().required().max(55),
  email: Joi.string().email().required(),
  role: Joi.string().valid("patient", "doctor").required(),
  password: Joi.string().min(6).required(),
});

const updateValidationSchema = Joi.object({
  gender: Joi.string().valid("male", "female").required(),
  address: Joi.string().max(500).required(),
  age: Joi.number().min(18).max(125).required(),
  name: Joi.string().max(255).required()
});

module.exports = {
  User,
  validationSchema,
  updateValidationSchema,
};
