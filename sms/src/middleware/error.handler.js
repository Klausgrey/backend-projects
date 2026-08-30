export function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500;
	const message = err.message || "there was a server error";

	console.error(err.stack);

	res.status(500).json({
		status: statusCode,
		message: message,
	});
}
