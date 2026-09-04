import { createTeacher } from "../controllers/teacher.controller.js";
import userSchema from "../validators/user.validator.js";
import validate from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";

import express from "express";
const router = express.Router();

router.post(
	"/teacher",
	authenticate,
	requireRole("ADMIN"),
	validate(userSchema),
	createTeacher,
);

export default router;
