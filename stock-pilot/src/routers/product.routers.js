import { authorize } from "../middleware/authorize.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { validator } from "../middleware/validator.middleware.js";

import { Router } from "express";
const router = Router();

export default router;
