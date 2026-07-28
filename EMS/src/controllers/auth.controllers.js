import User from "../models/user.model.js";
import Employee from "../models/employees.model.js";
import bcrypt from "bcrypt";
import { sendSuccess, sendError } from "../utils/response.js";
import Jwt from "jsonwebtoken";
const jwt = Jwt;
import "dotenv/config";

export async function register(req, res, next) {
	const { email, password } = req.body;
	try {
		const employee = await Employee.findOne({ email });
		if (!employee) return sendError(res, 404, "invalid credentials");
		const existing = await User.findById({ employeeId: employee._id });
		if (existing) return sendError(res, 409, "Employee already exists");

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			email,
			hashedpassword,
			role,
			employeeId: employee._id,
		});
		return sendSuccess(
			res,
			201,
			{
				id: user.employeeId,
				email: user.email,
				role: user.role,
			},
			"Created successfully",
		);
	} catch (err) {
		next(err);
	}
}
