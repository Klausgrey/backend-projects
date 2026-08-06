import "dotenv/config";
import authRouter from "./src/routers/auth.route.js";
import employeeRouter from "./src/routers/employee.route.js";
import departmentRouter from "./src/routers/department.route.js";
import express from "express";
const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("api/departments", departmentRouter);
export default app;
