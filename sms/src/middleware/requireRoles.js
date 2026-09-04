export function requireRole(...roles) {
	return (req, _res, next) => {
		if (!roles.includes(req.user?.role)) {
			const error = new Error(`access required to ${roles.join(", ")}`);
			error.statusCode = 403;
			return next(error);
		}
		next();
	};
}
