import express from "express";
import { errorHandler } from "./src/middleware/error.handler.js";
import userRouter from "./src/routers/user.routers.js";
import userManagement from "./src/routers/userManagement.routers.js";
import categoryRouter from "./src/routers/categories.routers.js";

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api", userRouter);
app.use("/api", userManagement);
app.use("/api", categoryRouter);

app.use(errorHandler);

export default app;
