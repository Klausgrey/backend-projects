import { createStudent } from "../controllers/student.controller.js";
import userSchema from "../validators/user.validator.js";
import validate from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";

import express from "express";
const router = express.Router();

router.post(
	"/student",
	authenticate,
	requireRole("ADMIN"),
	validate(userSchema),
	createStudent,
);

export default router;
