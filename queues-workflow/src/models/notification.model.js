const notifications = new Map();

export const addNotification = (userId, newNotifications) => {
	const existing = notifications.get(userId);
	if (!existing) notifications.set(userId, [newNotifications]);
	else existing.push(newNotifications);
};
export const getAllNotifications = (userId) => {
	const data = notifications.get(userId) || [];
	return data;
};
export const markAsRead = (userId, notificationId) => {
	const userNotis = notifications.get(userId);
	if (!userNotis) return;

	const target = userNotis.find((n) => n.id === notificationId);
	if (target) return target.read = true;
};
export const deleteNotification = (userId, notificationId) => {
	const userNotis = notifications.get(userId);
	if (!userNotis) return;

	const filtered = userNotis.filter((n) => n.id !== notificationId);
	const data = notifications.set(userId, filtered);

};
