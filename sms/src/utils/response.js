export function sendSuccess(res, statusCode, data, message) {
	res.status(statusCode).json({ status: true, data, message });
}

export function sendError(
	res,
	{ statusCode = 400, message = "bad request" } = {},
) {
	res.status(statusCode).json({ status: false, error: { message } });
}
