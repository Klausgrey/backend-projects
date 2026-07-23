import queue from "../queue/notificationQueue.js";
// import worker from "../worker/notificationWorker.js";
import {
	addNotification,
	deleteNotification,
	markAsRead,
	getAllNotifications,
} from "../models/notification.model.js";

export const sendNotification = async (req, res) => {
	const { userId, message } = req.body;
	queue.add("send-notification", { userId, message });
	res.status(202).json({ message: "notification queued" });
};
export const getNotifications = async (req, res) => {
	const userId = req.params.userId;
	const data = getAllNotifications(userId);
	res.status(200).json({ status: "success", data: data || [] });
};
export const readNotification = async (req, res) => {
	const { userId, notificationId } = req.params;
	const data = markAsRead(userId, notificationId);
	if (!data) return res.status(400).json({ message: "id not found" });
	res.status(200).json({ status: "successfull", data });
};
export const removeNotification = async (req, res) => {
	const { userId, notificationId } = req.params;
	const data = deleteNotification(userId, notificationId);
	if (!data) return res.status(400).json({ message: "id not found" });
	res.status(200).json({ status: "successfull", data });
};
