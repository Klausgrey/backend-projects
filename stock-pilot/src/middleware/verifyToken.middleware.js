import jwt from "jsonwebtoken";
import "dotenv/config";

export function verifyToken(req, res, next) {
	try {
		const auth = req.headers["authorization"];
		if (!auth) res.status(401).json({ message: "token was not provided" });
		const token = auth.split(" ")[1];
		if (!token) res.status(401).json({ message: "invalid token format" });

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError")
			throw new Error("token has expired");
		if (error.name === "JsonWebTokenError")
			throw new Error("invalid token or signature");
		throw error;
	}
}
