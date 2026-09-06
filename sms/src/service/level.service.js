import {
	createLevel as createLevelRecord,
	findLevelByName,
	getLevels as getLevelRecords,
} from "../models/level.model.js";

function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}

export async function createLevel({ name }) {
	if (!name) fail("there was no level name provided", 400);

	const isExisting = await findLevelByName({ name });
	if (isExisting) fail("there can't be duplicate levels", 409);

	const data = await createLevelRecord({ name });

	return data;
}

export async function getLevels() {
	const levels = await getLevelRecords();
	return { levels };
}
