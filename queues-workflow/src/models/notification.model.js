const notifications = new Map();

const addNotification = (userId, notifications) => {
	const existing = notifications.get(userId)
	if (!existing) notifications.set(userId, [notifications]);
	else existing.push(notifications)
};
const getNotifications = (userId) => {
	const data = notifications.get(userId) || [];
	return data;
};
const markAsRead = (userId, notificationId) => {};
const deleteNotification = (userId, notificationId) => {};
