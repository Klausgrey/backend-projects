import { z } from "zod";

const createEmployeeSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	phone: z.string(),
	dob: z.coerce.date(),
	address: z.string(),
	jobTitle: z.string(),
	salary: z.number(),
	department: z.string(),
	manager: z.string().optional(),
});

const createUserSchema = z.object({
	email: z.email(),
	password: z.string().min(8).max(15),
});
export default { createEmployeeSchema, createUserSchema };
