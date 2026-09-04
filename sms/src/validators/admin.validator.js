import Joi from "joi";

const adminSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.email": "email must be a valid one",
		"any.required": "email is required",
	}),
	hashedPassword: Joi.string()
		.required()
		.messages({ "any.requires": "password is required" }),
});

export default adminSchema;
