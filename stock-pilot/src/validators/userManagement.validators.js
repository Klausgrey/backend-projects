import Joi from "joi";

export const updateUserSchema = Joi.object({
	firstName: Joi.string().min(3).max(15).trim(),
	lastName: Joi.string().min(3).max(15).trim(),
	email: Joi.string().email().lowercase().trim(),
});

export const updateStatusSchema = Joi.object({
	isActive: Joi.boolean().required().strict(),
});
