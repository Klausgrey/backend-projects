export async function isExisting(queryPromise) {
	const result = await queryPromise;
	return !!result;
}

export function fail(message, statusCode) {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
}
