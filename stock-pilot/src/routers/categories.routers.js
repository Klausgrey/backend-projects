import {
	createCategory,
	getAllCategory,
	getCategoryById
} from "../controllers/categories.controller.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { createCategorySchema } from "../validators/categories.validator.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { validator } from "../middleware/validator.middleware.js";

import { Router } from "express";
const router = Router();

router.post(
	"./categories",
	verifyToken,
	authorize("admin"),
	validator(createCategorySchema),
	createCategory,
);

router.get(
	"./categories/",
	verifyToken,
	authorize("admin", "staff"),
	getAllCategory,
);
router.get(
	"./categories/:id",
	verifyToken,
	authorize("admin", "staff"),
	getCategoryById,
);


export default router;
