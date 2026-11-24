import Joi from "joi";

export const createProductSchema = Joi.object({
	name: Joi.string().trim().required(),
	description: Joi.string().min(5).max(500),
	brand: Joi.string().min(5).max(500),
	variant: Joi.object().keys({
		color: Joi.string().trim(),
		size: Joi.string().trim(),
	}),
});
