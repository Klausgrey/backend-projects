import prisma from "../config/prisma.js";

export async function findUserbyEmail(email) {
	return prisma.user.findUnique({ where: { email } });
}

