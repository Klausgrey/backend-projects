import { findAcademicSessionById } from "../models/academicSession.model.js";
import { createSemesterModel } from "../models/semester.model.js";
import { fail } from "../utils/helper.js";

export async function createSemesterService({ sessionId, resumptionDate }) {
	const session = await findAcademicSessionById({ id: sessionId });
	if (!session) fail("academic session not found", 404);

	const data = await createSemesterModel({
		sessionId,
		resumptionDate: new Date(resumptionDate),
	});
	return data;
}
