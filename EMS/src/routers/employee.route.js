import {
	createEmployee,
	getAllEmployess,
	getCurrentEmployee,
	updateEmployees,
	deleteEmployee,
} from "../controllers/employee.controllers.js";
import {
	validateToken,
	isAdmin,
} from "../middleware/authenticate.middleware.js";
import express from "express";
const router = express.Router();

router.post("/", validateToken, isAdmin, createEmployee);
router.get("/", validateToken, isAdmin, getAllEmployess);
router.get("/:id", validateToken, getCurrentEmployee);
router.patch("/", validateToken, updateEmployees);
router.delete("/:id", validateToken, deleteEmployee);

export default router;
