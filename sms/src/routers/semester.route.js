import { createSemesterController } from "../controllers/semester.controller.js";
import validate from "../middleware/validate.js";
import semesterSchema from "../validators/semester.validator.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";

import express from "express";
const router = express.Router();

router.post(
	"/semester",
	authenticate,
	requireRole("ADMIN"),
	validate(semesterSchema),
	createSemesterController,
);
// router.get("/" );

export default router;
