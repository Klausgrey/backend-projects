import {
	createCourseController,
	getCourses,
} from "../controllers/course.controller.js";
import { requireRole } from "../middleware/requireRoles.js";
import { authenticate } from "../middleware/authenticate.js";

import { Router } from "express";
const router = Router();

router.post(
	"/courses",
	authenticate,
	requireRole("ADMIN"),
	createCourseController,
);

router.get("/courses", authenticate, requireRole("ADMIN"), getCourses);
export default router;
