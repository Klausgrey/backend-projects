import express from "express";
import {
	sendNotification,
	getNotifications,
	readNotification,
	removeNotification,
} from "../controllers/notification.controller.js";
const router = express.Router();

router.post("/", sendNotification);
router.get("/:userId", getNotifications);
router.put("/:userId/:notificationId/read", readNotification);
router.delete("/:userId/:notificationId", removeNotification);

export default router;
