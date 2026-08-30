import { login } from "../controllers/auth.controller.js";
import loginSchema from "../validators/auth.validator.js";
import validate from "../middleware/validate.js";

import express from "express";
const router = express.Router();

router.post("/login", validate(loginSchema), login);

export default router;
