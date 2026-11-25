import jwt from "jsonwebtoken";
import "dotenv/config";
import { fail } from "../helpers/errors.js";

export function verifyToken(req, res, next) {
	try {
		const auth = req.headers["authorization"];
		if (!auth)
			return res.status(401).json({ message: "token was not provided" });
		const token = auth.split(" ")[1];
		if (!token)
			return res.status(401).json({ message: "invalid token format" });

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError")
			fail("token has expired", 401);
		if (error.name === "JsonWebTokenError")
			fail("invalid token or signature", 401);
		throw error;
	}
}
