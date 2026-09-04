import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";
import { registerAdmin } from "../controllers/admin.controller.js";
import validate from "../middleware/validate.js";
import userSchema from "../validators/user.validator.js";

import express from "express";
const router = express.Router();

router.post(
	"/admins",
	authenticate,
	requireRole("SUPER_ADMIN"),
	validate(userSchema),
	registerAdmin,
);

export default router;
