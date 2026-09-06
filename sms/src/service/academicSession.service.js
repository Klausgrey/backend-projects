import {
	createAcademicSession,
	getAcademicSession,
	findAcademicSessionByName,
} from "../models/academicSession.model.js";
import { isExisting, fail } from "../utils/helper.js";

export async function createAcademicSessionServiceService({ name }) {
	const result = await isExisting(findAcademicSessionByName({ name }));
	if (result) fail("this session already exists", 409);

	const data = await createAcademicSession({ name });
	return data;
}

export async function getAcademicSessionService() {
	const result = await getAcademicSession();
	return result;
}
