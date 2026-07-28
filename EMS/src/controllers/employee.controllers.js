import Employee from "../models/employees.model.js";
import Department from "../models/department.models.js";
import createEmployeeSchema from "../validate/validation.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const createEmployee = async (req, res, next) => {
	try {
		const validateData = createEmployeeSchema.parse(req.body);

		const existing = await Employee.findOne({ email: validateData.email });
		if (existing)
			return sendError(res, 409, "Employee with this email already exists");

		if (validateData.department) {
			const dept = await Department.findById(validateData.department);
			if (!dept) return sendError(res, 404, "department not found");
		}

		const employee = await Employee.create(validateData);
		return sendSuccess(res, 201, employee, "employee created successfully");
	} catch (err) {
		next(err);
	}
};
