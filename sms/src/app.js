import express from "express";
import { sendSuccess, sendError } from "./utils/response.js";
import { errorHandler } from "./middleware/error.handler.js";

import authRoute from "./routers/auth.route.js";
import adminRoute from "./routers/admin.route.js";

const app = express();
app.use(express.json());

app.use("/api", authRoute);
app.use("/api", adminRoute);

app.get("/health", async (_req, res) => {
	return sendSuccess(res, {
		message: "This is a health check no need to worry",
	});
});

app.use((_req, res) => {
	return sendError(res, { statusCode: 404, message: "end point not found" });
});

app.use(errorHandler);
export default app;
