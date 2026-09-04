import prisma from "../config/prisma.js";

export async function createLevel(name) {
	return prisma.level.create({ data: { name } });
}
