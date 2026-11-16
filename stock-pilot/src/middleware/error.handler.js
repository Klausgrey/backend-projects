export function  errorHandler(error, req, res, next) {
	const statusCode = error.statusCode || 500;
	const message = error.message || "server error...";
	console.error(error);

	res.status(statusCode).json({
		status: statusCode,
		message: message,
	});
}
