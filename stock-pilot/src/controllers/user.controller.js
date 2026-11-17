import {
	createUsers,
	loginUser,
	getCurrentUser,
	changeUserPassword,
} from "../models/user.model.js";

export async function register(req, res, next) {
	try {
		const data = await createUsers(req.body);
		res.status(201).json({ message: "user created successfully", data: data });
	} catch (error) {
		next(error);
	}
}

export async function login(req, res, next) {
	try {
		const data = await loginUser(req.body);
		res.status(200).json({ message: "user signed-in successfully", data });
	} catch (error) {
		next(error);
	}
}

export async function getMe(req, res, next) {
	try {
		const data = await getCurrentUser({ userId: req.user.userId });
		res.status(200).json({ message: "current user", data });
	} catch (error) {
		next(error);
	}
}

export async function changePassword(req, res, next) {
	try {
		await changeUserPassword({
			userId: req.user.userId,
			currentPassword: req.body.currentPassword,
			newPassword: req.body.newPassword,
		});
		res.status(200).json({ message: "password changed successfully" });
	} catch (error) {
		next(error);
	}
}
