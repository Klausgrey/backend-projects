import { register } from "../controllers/user.controller.js";
import { validator } from "../middleware/validator.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

import express from "express";
const router = express.Router();

router.post("/register", validator(registerSchema), register);

export default router;
