import { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";

export const verify = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const signature = req.headers["signature"];
	const secret = process.env.WEBHOOK_KEY!;
	const hash = crypto
		.createHmac("sha256", secret)
		.update(JSON.stringify(req.body))
		.digest("hex");

	if (signature === hash) {
		next();
	} else {
		return res.status(401).json({ message: "unauthorized..." });
	}
};
