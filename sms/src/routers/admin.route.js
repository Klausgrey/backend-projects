import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";
import { registerAdmin } from "../controllers/admin.controller.js";
import validate from "../middleware/validate.js";
import adminSchema from "../validators/admin.validator.js";

import express from "express";
const router = express.Router();

router.post(
	"/admins",
	authenticate,
	requireRole("SUPER_ADMIN"),
	validate(adminSchema),
	registerAdmin,
);

export default router;
