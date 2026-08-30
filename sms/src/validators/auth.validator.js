import Joi from "joi";

const loginSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.email": "email must be a valid one",
		"any.requires": "email is required",
	}),

	password: Joi.string()
		.required()
		.messages({ "any.requires": "password is required" }),
});

export default loginSchema;
