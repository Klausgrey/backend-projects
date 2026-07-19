const notifications = new Map();

const addNotification = (userId, newNotifications) => {
	const existing = notifications.get(userId);
	if (!existing) notifications.set(userId, [newNotifications]);
	else existing.push(newNotifications);
};
const getNotifications = (userId) => {
	const data = notifications.get(userId) || [];
	return data;
};
const markAsRead = (userId, notificationId) => {
	const userNotis = notification.get(userId);
	if (!userNotis) return;

	const target = userNotis.find((n) => n.id === notificationId);
	if (target) target.read = true;
};
const deleteNotification = (userId, notificationId) => {
	const userNotis = notification.get(userId);
	if (!userNotis) return;

	const filtered = userNotis.filter((n) => n.id !== notificationId);
	notification.set(userId, filtered);
};
