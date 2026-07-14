import {
	receiveWebhook,
	getAll,
	getAllById,
} from "../controllers/webhook.controllers.js";
import { verify } from "../middlewares/verifySignature.js";
import express from "express";

const router = express.Router();

router.post("/", verify, receiveWebhook);
router.get("/", verify, getAll);
router.get("/:id", verify, getAllById);

export default router;
