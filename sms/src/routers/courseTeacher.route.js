import { createCourseTeacherController } from "../controllers/courseTeacher.controller.js";
import { requireRole } from "../middleware/requireRoles.js";
import { authenticate } from "../middleware/authenticate.js";
import validate from "../middleware/validate.js";
import { createCourseTeacherSchema } from "../validators/admin.validator.js";

import { Router } from "express";
const router = Router();

router.post(
	"/course-teacher",
	authenticate,
	requireRole("ADMIN"),
	validate(createCourseTeacherSchema),
	createCourseTeacherController,
);

export default router;
