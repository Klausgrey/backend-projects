import { createEmployee, getAllEmployess } from "../controllers/employee.controllers.js";
import {
	validateToken,
	isAdmin,
} from "../middleware/authenticate.middleware.js";
import express from "express";
const router = express.Router();

router.post("/", validateToken, isAdmin, createEmployee);
router.ger("/", validateToken, isAdmin, getAllEmployess)

export default router;
