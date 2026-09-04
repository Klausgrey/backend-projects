import Joi from "joi";

const departmentSchema = Joi.object({
	name: Joi.string(),
});

export default departmentSchema;
