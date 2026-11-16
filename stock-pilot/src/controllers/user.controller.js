import { createUsers, loginUser } from "../models/user.model.js";

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
		res
			.status(200)
			.json({ message: "user signed-in successfully", data });
	} catch (error) {
		next(error);
	}
}
