import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRoles.js";
import { registerAdmin } from "../controllers/admin.controller.js";

import express from "express";
const router = express.Router();

router.post("/admins", authenticate, requireRole("SUPER_ADMIN"), registerAdmin);

export default router;
