export function authorize(...allowedRoles) {
	return (req, res, next) => {
		if (!req.user)
			return res.status(401).json({ message: "authentication required" });

		if (!req.user.role) return res.status(403).json({ message: "forbidden" });

		if (!allowedRoles.includes(req.user.role))
			return res.status(403).json({ message: "forbidden" });
		next()
	};
}
