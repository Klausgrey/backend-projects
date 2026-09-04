import prisma from "../config/prisma.js";

export async function createDepartment({ name }) {
	return prisma.department.create({ data: { name } });
}

export async function findDepartment({ name }) {
	return prisma.department.findFirst({ where: { name } });
}
