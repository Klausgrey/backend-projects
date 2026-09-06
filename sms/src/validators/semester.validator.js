import Joi from "joi";

const semesterSchema = Joi.object({
	sessionId: Joi.string().required(),
	resumptionDate: Joi.date().required(),
});

export default semesterSchema;
