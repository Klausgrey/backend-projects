import prisma from "../config/prisma.js";

export async function createDepartment({ name }) {
	return prisma.department.create({ data: { name } });
}

export async function findDepartmentByName({ name }) {
	return prisma.department.findFirst({ where: { name } });
}

export async function findDepartmentById({ id }) {
	return prisma.department.findUnique({ where: { id } });
}

export async function getDepartments() {
	return prisma.department.findMany();
}
