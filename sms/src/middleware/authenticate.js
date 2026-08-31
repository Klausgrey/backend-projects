import jwt from "jsonwebtoken";
import { sendError, sendSuccess } from "../utils/response.js";
import { findUserById } from "../models/user.model.js";
import "dotenv/config";

export async function authenticate(req, res, next) {
	try {
		const auth = req.headers["authenticate"];
		if (!auth) return sendError(res, 401, "token was not provided");
		const token = auth.split(" ")[1];
		if (!token) return sendError(res, 401, "invalid token format");

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await findUserById(decoded.id);
		if (!user) return sendError(res, 401, "user not found");

		req.user = decoded;
		next();
	} catch (err) {
		next(err);
	}
}
