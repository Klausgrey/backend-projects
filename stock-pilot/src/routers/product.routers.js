import { createProduct } from "../controllers/product.controller.js";
import { createProductSchema } from "../validators/product.validator.js";

import { authorize } from "../middleware/authorize.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { validator } from "../middleware/validator.middleware.js";

import { Router } from "express";
const router = Router();

router.post(
	"/products",
	verifyToken,
	// validator(createProductSchema),
	authorize("admin"),
	createProduct,
);

export default router;
