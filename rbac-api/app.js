import express from "express";
import errorHandler from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.route.js"
import userRouter from "./routes/user.route.js"
import { connectMG } from "./config/db.js";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use(errorHandler);
connectMG();

app.listen(3000, () => {
	console.log("server running...");
});
