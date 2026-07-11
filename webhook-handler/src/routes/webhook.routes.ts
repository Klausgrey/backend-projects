import {
	receiveWebhook,
	getAll,
	getAllById,
} from "../controllers/webhook.controllers.js";
import express from "express";

const router = express.Router();

router.post("/", receiveWebhook);
router.get("/", getAll);
router.post("/:id", getAllById);

export default router