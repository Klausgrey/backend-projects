import Joi from "joi";

export const createCourseTeacherSchema = Joi.object({
	teacherId: Joi.string().required(),
	courseId: Joi.string().required(),
});
