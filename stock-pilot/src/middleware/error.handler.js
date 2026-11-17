export function errorHandler(error, _req, res, _next) {
	let statusCode = error.statusCode || 500;
	let message =
		statusCode === 500
			? "internal server error"
			: error.message || "something went wrong";

	if (error.code === "22P02") {
		statusCode = 400;
		message = "invalid id format";
	}

	const details = error.details;
	
	console.error(error);
	res.status(statusCode).json({
		statusCode,
		message,
		...(details !== undefined && statusCode !== 500 && { details }),
	});
}
