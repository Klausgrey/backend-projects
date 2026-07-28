import { sendSuccess, sendError } from "../utils/response.js";
import Jwt from "jsonwebtoken";
const jwt = Jwt;
import "dotenv/config"

export function validateToken(req, res, next) {
	const auth = req.headers["authorization"];
	if (!auth) return sendError(res, 401, "Token not provided");

	const token = auth.split(" ")[1];
	if (!token) return sendError(res, 401, "Invalid token format");

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return sendError(res, 401, "Invalid or expired token");
	}
}

export function isAdmin(req, res, next) {
	const user = req.user.role;
	if (user === "admin") next();
	else return sendError(res, 403, "Access denied");
}

