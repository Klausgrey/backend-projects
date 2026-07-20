import queue from "../queue/notificationQueue.js";
import worker from "../worker/notificationWorker.js";
import {
	addNotification,
	deleteNotification,
	markAsRead,
	getNotifications,
} from "../models/notification.model.js";

export const sendNotification = async (req, res) => {
	const { userId, message } = req.body;
	queue.add("send-notification", { userId, message });
	res.status(202).json({ message: "notification queued" });
};
export const getNotifications = () => {};
export const readNotification = () => {};
export const removeNotification = () => {};

// sendNotification — adds a job to the queue
// getUserNotifications — gets all notifications for a user
// readNotification — marks a notification as read
// removeNotification — deletes a notification
