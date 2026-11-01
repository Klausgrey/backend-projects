import {
	createEnrollmentModel,
	findStudentCourseSemesterLink,
} from "../models/enrollment.model.js";
import { fail } from "../utils/helper.js";

export async function createEnrollmentService({
	studentId,
	courseId,
	status,
	semesterId,
}) {
	const isExisting = await findStudentCourseSemesterLink({
		studentId,
		courseId,
		semesterId,
	});
	if (isExisting) fail("this enrollment already exists", 409);

	const enrolllment = await createEnrollmentModel({
		studentId,
		courseId,
		status,
		semesterId,
	});

	return enrolllment;
}
