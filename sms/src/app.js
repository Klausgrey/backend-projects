import express from "express";
import { sendSuccess, sendError } from "./utils/response.js";
import { errorHandler } from "./middleware/error.handler.js";
import cors from "cors";

import authRoute from "./routers/auth.route.js";
import adminRoute from "./routers/admin.route.js";
import departmentRoute from "./routers/department.route.js";
import levelRoute from "./routers/level.route.js";
import studentRoute from "./routers/student.route.js";
import teacherRoute from "./routers/teacher.route.js";
import academicSessionRoute from "./routers/academicSession.route.js";
import semesterRoute from "./routers/semester.route.js";
import coureseRoute from "./routers/course.route.js";
import courseTeacherRoute from "./routers/courseTeacher.route.js";
import enrollmentRoute from "./routers/enrollment.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoute);
app.use("/api", adminRoute);
app.use("/api", departmentRoute);
app.use("/api", levelRoute);
app.use("/api", studentRoute);
app.use("/api", teacherRoute);
app.use("/api", academicSessionRoute);
app.use("/api", semesterRoute);
app.use("/api", coureseRoute);
app.use("/api", courseTeacherRoute);
app.use("/api", enrollmentRoute);

app.get("/api/health", async (_req, res) => {
	const data = "FALSE ALARM";
	return sendSuccess(res, 200, data, "This is a health check no need to worry");
});

app.use((_req, res) => {
	return sendError(res, 404, "end point not found");
});

app.use(errorHandler);
export default app;
