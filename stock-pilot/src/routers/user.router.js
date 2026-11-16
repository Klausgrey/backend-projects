import { register, login } from "../controllers/user.controller.js";
import { authorize } from "../validators/authorize.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { validator } from "../middleware/validator.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

import express from "express";
const router = express.Router();

router.post(
	"/admin/register",
	verifyToken,
	authorize("admin"),
	validator(registerSchema),
	register,
);
router.post("/login", validator(loginSchema), login);

export default router;
