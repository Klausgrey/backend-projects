import express from "express";
const router = express.Router();
import { createDepartment } from "../controllers/department.controller.js";
import {
	validateToken,
	isAdmin,
} from "../middleware/authenticate.middleware.js";

router.post("/", validateToken, isAdmin, createDepartment);

export default router;
