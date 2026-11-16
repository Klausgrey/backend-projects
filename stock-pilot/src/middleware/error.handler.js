export function errorHandler(error, req, res, next) {
	const statusCode = error.statusCode || 500;
	const message =
		statusCode === 500
			? "internal server error"
			: error.message || "something went wrong";
	const details = error.details;

	console.error(error);
	res.status(statusCode).json({
		statusCode,
		message,
		...(details !== undefined && statusCode !== 500 && { details }),
	});
}
