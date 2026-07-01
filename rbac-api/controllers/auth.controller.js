import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		// const user = await User.findOne({ username });
		// if (user)
		// 	return res.status(200).json({ message: "user already exists..." });
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		res
			.status(201)
			.json(`${result.username} profile created with the id ${result.id}`);
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) return res.status(400).json({ message: "invalid username" });
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ message: "invalid password" });

		const token = sign(
			{
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "7d" },
		);
		res.status(200).json({token: token, user_role: user.role})
	} catch (err) {
		next(err);
	}
};
