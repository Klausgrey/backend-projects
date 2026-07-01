import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;

export const verifyToken = async (req, res, next) => {
	const auth = req.headers.autorization;
	if (!auth) return res.status(400).json({ message: "no token provided" });

	const token = auth.split("")[1];
	if (!token) return res.status(400).json({ message: "no token format" });

	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		next(err);
	}
};

export const isAdmin = (req, res, next) => {
	const role = req.user.role;

	if (role === "admin") next();
	else return res.status(403).json({ message: "Access denied ..." });
};
