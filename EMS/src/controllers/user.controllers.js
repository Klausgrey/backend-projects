import User from "../models/user.model.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const register = async (req, res, next) => {
	const {id, email, passwordHash, role, employeeId, refreshToken }
}