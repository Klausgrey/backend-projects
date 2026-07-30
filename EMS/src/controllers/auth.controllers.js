import User from "../models/user.model.js";
import Employee from "../models/employees.model.js";
import { createUserSchema } from "../validate/validation.js";
import bcrypt from "bcrypt";
import { sendSuccess, sendError } from "../utils/response.js";
import Jwt from "jsonwebtoken";
const jwt = Jwt;
import "dotenv/config";

export async function register(req, res, next) {
	const validateBody = createUserSchema.parse(req.body);
	try {
		const employee = await Employee.findOne({ email: validateBody.email });
		if (!employee) return sendError(res, 404, "invalid credentials");
		const existing = await User.findOne({ employeeId: employee._id });
		if (existing) return sendError(res, 409, "Employee already exists");

		const hashedPassword = await bcrypt.hash(validateBody.password, 10);
		const user = await User.create({
			email: validateBody.email,
			hashedPassword,
			role: employee.isAdmin ? "admin" : "employee",
			employeeId: employee._id,
		});
		return sendSuccess(
			res,
			201,
			{
				id: user._id,
				email: user.email,
				role: user.role,
			},
			"Created successfully",
		);
	} catch (err) {
		next(err);
	}
}

export async function login(req, res, next) {
	const validateBody = createUserSchema.parse(req.body);
	try {
		const user = await User.findOne({ email: validateBody.email });
		if (!user) return sendError(res, 404, "invalid credentials");
		const match = await bcrypt.compare(
			validateBody.password,
			user.hashedPassword,
		);
		if (!match) return sendError(res, 401, "invalid credentials");

		const payload = {
			id: user._id,
			role: user.role,
			employeeId: user.employeeId,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION_TIME || "7d",
		});
		return sendSuccess(res, 200, { token }, "Login successful");
	} catch (err) {
		next(err);
	}
}

export async function getUser(req, res, next) {
	try {
		const user = await User.findById(req.user.id).select(
			"hashedPassword, refreshToken",
		);
		return sendSuccess(res, 200, user, "current user");
	} catch (err) {
		next(err);
	}
}
// | GET | `/api/auth/me` | Authenticated | Return current logged-in user + profile |
