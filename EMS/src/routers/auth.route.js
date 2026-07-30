import { register, login, getUser } from "../controllers/auth.controllers.js";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth/me", getUser);

export default router;
