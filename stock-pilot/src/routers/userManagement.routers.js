import {
	getAll,
	getById,
	updateUser,
} from "../controllers/userManagement.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

import { Router } from "express";
const router = Router();

router.get("/users", verifyToken, authorize("admin"), getAll);
router.get("/users/:id", verifyToken, authorize("admin"), getById);
router.patch("/users/:id", verifyToken, authorize("admin"), updateUser);

export default router;
