import {
	department,
	getDepartments,
} from "../controllers/department.controller.js";
import departmentSchema from "../validators/department.validator.js";
import validate from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";

import express from "express";
const router = express.Router();

router.post(
	"/department",
	authenticate,
	requireRole("ADMIN"),
	validate(departmentSchema),
	department,
);
router.get("/department", getDepartments);

export default router;
