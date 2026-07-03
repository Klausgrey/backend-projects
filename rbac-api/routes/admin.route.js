import { verifyToken, authorizeRole } from "../middleware/verify.middleware.js";
import { getDashboard } from "../controllers/admin.controller.js";
import express from "express";
const router = express.Router();

router.get("/dashboard", verifyToken, authorizeRole("admin"), getDashboard);

export default router;
