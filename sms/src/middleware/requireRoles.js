export function requireRole(roles) {
	return (req, _res, next) => {
		if (!roles.include(req.user?.role)) {
			const error = new Error(`access required to ${role.join(", ")}`);
			error.statusCode = 403;
			return next(error);
		}
		next();
	};
}
