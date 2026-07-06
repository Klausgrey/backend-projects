import { User } from "../models/user.model.js";

export const getDashboard = (req, res) => {
	res.json({ message: "Welcome to the admin dashboard", user: req.user });
};

export const getAllUsers = async (_req, res, next) => {
	try {
		const data = await User.find();
		res.status(200).json({
			data: data
		});
	} catch (err) {
		next(err);
	}
};
