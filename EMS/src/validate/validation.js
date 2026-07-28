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

export default createEmployeeSchema;
