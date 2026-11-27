import {} from "../controllers/supplier.controller.js";

import { authorize } from "../middleware/authorize.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { validator } from "../middleware/validator.middleware.js";

import { Router } from "express";
const router = Router();

router.post();
router.get();

export default router;
