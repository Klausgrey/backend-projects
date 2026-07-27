import { sendError } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	const status = err.statusCode || 500;
	const message = err.message || "something went wrong";
	return sendError(res, status, message);
};
