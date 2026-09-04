import Joi from "joi";

const levelSchema = Joi.object({
	name: Joi.string(),
});

export default levelSchema;
