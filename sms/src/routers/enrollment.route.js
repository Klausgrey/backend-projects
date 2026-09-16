import { createEnrollmentController } from "../controllers/enrollment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";

import express from "express";
const router = express.Router();

router.post(
	"/enrollments",
	authenticate,
	requireRole("ADMIN"),
	createEnrollmentController,
);

export default router;
