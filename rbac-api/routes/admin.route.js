import { verifyToken, authorizeRole } from "../middleware/verify.middleware.js";
import { getDashboard, getAllUsers } from "../controllers/admin.controller.js";
import express from "express";
const router = express.Router();

router.get("/dashboard", verifyToken, authorizeRole("admin"), getDashboard);
router.get("/users", verifyToken, authorizeRole("admin"), getAllUsers);

export default router;
