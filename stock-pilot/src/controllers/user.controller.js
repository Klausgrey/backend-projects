import { createUsers } from "../models/user.model.js";

export async function register(req, res, next) {
	try {
		const data = await createUsers(req.body);
		res.status(201).json({ message: "user created successfully", data: data });
	} catch (error) {
		next(error);
	}
}
