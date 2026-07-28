import { createEmployee } from "../controllers/employee.controllers.js ";
import {
	validateToken,
	isAdmin,
} from "../middleware/authenticate.middleware.js";
import express from "express";
const router = express.Router();

router.post("/", validateToken, isAdmin, createEmployee);

export default router;
