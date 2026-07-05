import { verifyToken, authorizeRole } from "../middleware/verify.middleware.js";
import { getReport } from "../controllers/moderator.controller.js";
import express from "express";
const router = express.Router();

router.get(
	"/report",
	verifyToken,
	authorizeRole("admin", "moderator"),
	getReport,
);

export default router;
