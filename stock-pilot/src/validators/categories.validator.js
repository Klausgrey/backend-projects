import Joi from "joi";

export const createCategorySchema = Joi.object({
	name: Joi.string().max(100).required().trim(),
	description: Joi.string().max(500),
});

export const updatecategorySchema = Joi.object({
	name: Joi.string().max(100).required().trim(),
	description: Joi.string().max(500),
});
