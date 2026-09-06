import {
	createAcademicSessionController,
	getAcademicSessionController,
} from "../controllers/academicSession.controller.js";
import departmentSchema from "../validators/department.validator.js";
import validate from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";

import express from "express";
const router = express.Router();

router.post(
	"/academicSession",
	authenticate,
	requireRole("ADMIN"),
	validate(departmentSchema),
	createAcademicSessionController,
);
router.get("/academicsession", getAcademicSessionController);

export default router;
