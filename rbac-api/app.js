import express from "express";
import errorHandler from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import { connectMG } from "./config/db.js";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use(errorHandler);
connectMG();

app.listen(3000, () => {
	console.log("server running...");
});
