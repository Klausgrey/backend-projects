import { findAcademicSessionById } from "../models/academicSession.model.js";
import { createSemesterModel } from "../models/semester.model.js";
import { isExisting, fail } from "../utils/helper.js";

export async function createSemesterService({ sessionId, resumptionDate }) {
	const result = await isExisting(findAcademicSessionById({ id }));
	if (result) fail("there was a sememter created with this same session", 409);

	const data = await createSemesterModel({ sessionId, resumptionDate });
	return data;
}
