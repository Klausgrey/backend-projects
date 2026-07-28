import authRouter from "./src/routers/auth.route.js";
import employeeRouter from "./src/routers/employee.route.js";
import express from "express";
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/auth/employee", employeeRouter);
export default app;
