import { createLevel, getLevels } from "../controllers/level.controller.js";
import levelSchema from "../validators/level.validator.js";
import validate from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";

import express from "express";
const router = express.Router();

router.post(
	"/level",
	authenticate,
	requireRole("ADMIN"),
	validate(levelSchema),
	createLevel,
);
router.get("/level", getLevels);

export default router;
