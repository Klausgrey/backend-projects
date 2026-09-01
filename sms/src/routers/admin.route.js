import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";

import express from "express";
const router = express.Router();

router.post(
	"/admins",
	authenticate,
	requireRole("SUPER_ADMIN", "a controller goes here"),
);

export default router;
