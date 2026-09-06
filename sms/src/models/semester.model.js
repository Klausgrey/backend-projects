import prisma from "../config/prisma.js";

export async function createSemesterModel({ sessionId, resumptionDate }) {
	return prisma.semester.create({
		data: { session_id: sessionId, resumption_date: resumptionDate },
	});
}
