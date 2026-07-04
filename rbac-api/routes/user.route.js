import { getProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verify.middleware.js";
import express from "express";
const router = express.Router();

router.get("/profile", verifyToken, getProfile);
