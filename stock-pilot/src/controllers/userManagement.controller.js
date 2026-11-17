import { getAllUsers } from "../models/userManagement.model.js";

export async function getAll(_req, res) {
	const data = await getAllUsers();
	res.status(200).json({ message: "users retrieved successfully ", data });
}
