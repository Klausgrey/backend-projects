import { register, login } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../validate/schema.js";
import { validate } from "../middleware/validate.middleware.js";
import express from "express";
const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
