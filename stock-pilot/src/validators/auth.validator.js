import Joi from "joi";

export const registerSchema = Joi.object({
	firstName: Joi.string().required().min(3).max(15).trim(),
	lastName: Joi.string().required().min(3).max(15).trim(),
	email: Joi.string().email().required().lowercase().trim(),
	passwordHash: Joi.string()
		.required()
		.min(8)
		.max(50)
		.pattern(/^.{8,16}$/),
	phoneNumber: Joi.string()
		.pattern(/^(0|\+?234)[7-9][0-1][0-9]{8}/)
		.required(),
});

export const loginSchema = Joi.object({
	email: Joi.email().required().lowercase().trim(),
	passwordHash: Joi.string()
		.required()
		.min(8)
		.max(50)
		.pattern(/^.{8,16}$/),
});
