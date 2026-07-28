import authRouter from "./src/routers/auth.route.js";
import employeeRouter from "./src/routers/employee.route.js";
import express from "express";
const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/employee", employeeRouter);
export default app;
