import {
	register,
	login,
	getMe,
	changePassword,
} from "../controllers/user.controller.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { validator } from "../middleware/validator.middleware.js";
import {
	registerSchema,
	loginSchema,
	changePasswordSchema,
} from "../validators/auth.validator.js";

import { Router } from "express";
const router = Router();

router.post(
	"/admin/register",
	verifyToken,
	authorize("admin"),
	validator(registerSchema),
	register,
);
router.post("/login", validator(loginSchema), login);
router.get("/me", verifyToken, getMe);
router.patch(
	"/change-password",
	verifyToken,
	validator(changePasswordSchema),
	changePassword,
);

export default router;
