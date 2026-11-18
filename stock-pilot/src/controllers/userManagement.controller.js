import {
	getAllUsers,
	getUserById,
	updateUserById,
	upadateUserStatus,
} from "../models/userManagement.model.js";

export async function getAll(_req, res) {
	const data = await getAllUsers();
	res.status(200).json({ message: "users retrieved successfully ", data });
}

export async function getById(req, res) {
	const data = await getUserById(req.params.id);
	res.status(200).json({ message: "user", data });
}

export async function updateUser(req, res) {
	const { firstName, lastName, email } = req.body;
	const data = await updateUserById(req.params.id, {
		firstName,
		lastName,
		email,
	});
	res.status(200).json({ message: "user updated successfully", data });
}

export async function updateStatus(req, res) {
	console.log(req.user.userId, req.body.isActive);
	const data = await upadateUserStatus(req.params.id, req.body.isActive);
	res.status(200).json({ message: "user status updated successfully", data });
}
