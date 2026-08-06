import { register, login, getUser } from "../controllers/auth.controllers.js";
import {
	validateToken,
	isAdmin,
} from "../middleware/authenticate.middleware.js";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", validateToken, getUser);

export default router;
