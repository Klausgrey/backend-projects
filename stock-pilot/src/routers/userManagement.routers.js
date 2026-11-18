import {
	getAll,
	getById,
	updateUser,
	updateStatus,
} from "../controllers/userManagement.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import {
	updateUserSchema,
	updateStatusSchema,
} from "../validators/userManagement.validators.js";
import { validator } from "../middleware/validator.middleware.js";

import { Router } from "express";
const router = Router();

router.get("/users", verifyToken, authorize("admin"), getAll);
router.get("/users/:id", verifyToken, authorize("admin"), getById);
router.patch(
	"/users/:id",
	verifyToken,
	authorize("admin"),
	validator(updateUserSchema),
	updateUser,
);
router.patch(
	"/users/:id/status",
	verifyToken,
	authorize("admin"),
	validator(updateStatusSchema),
	updateStatus,
);

export default router;
