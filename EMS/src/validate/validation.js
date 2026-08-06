import { z } from "zod";

export const createEmployeeSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	phone: z.string().optional(),
	dob: z.coerce.date().optional(),
	address: z.string().optional(),
	jobTitle: z.string(),
	salary: z.number(),
	department: z.string().optional(),
});

export const createUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(15),
});
