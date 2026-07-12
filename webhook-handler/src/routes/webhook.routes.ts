import {
	receiveWebhook,
	getAll,
	getAllById,
} from "../controllers/webhook.controllers.js";
import { verify } from "../middlewares/verifySignature.js";
import express from "express";

const router = express.Router();

router.post("/", verify, receiveWebhook);
router.get("/", getAll);
router.get("/:id", getAllById);

export default router;
