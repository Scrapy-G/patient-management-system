const express = require("express");

const userController = require("../controllers/user.controller");
const { validationSchema, updateValidationSchema } = require("../models/user.model");
const validate = require("../middleware/validate.middleware");
const isAuth = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", validate(validationSchema), userController.addUser);
router.get("/me", isAuth, userController.getMe);
router.put("/me", isAuth, validate(updateValidationSchema), userController.updateMe);
router.delete("/me", isAuth, userController.deleteMe);

module.exports = router;