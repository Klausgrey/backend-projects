import prisma from "../config/prisma.js";

export async function createLevel({ name }) {
	return prisma.level.create({ data: { name } });
}

export async function findLevelByName({ name }) {
	return prisma.level.findFirst({ where: { name } });
}

export async function findLevelByIdById({ id }) {
	return prisma.level.findUnique({ where: { id } });
}
