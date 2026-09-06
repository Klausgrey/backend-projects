import prisma from "../config/prisma.js";

export async function createAcademicSession({ name }) {
	return prisma.academicSession.create({ data: { name } });
}

export async function getAcademicSession() {
	return prisma.academicSession.findMany();
}

export async function findAcademicSessionByName({ name }) {
	return prisma.academicSession.findFirst({ where: { name } });
}

export async function findAcademicSessionById({ id }) {
	return prisma.academicSession.findUnique({ where: { id } });
}
