import Employee from "../models/employees.model.js";
import Department from "../models/department.models.js";
import { createEmployeeSchema } from "../validate/validation.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { tr } from "date-fns/locale";

export async function createEmployee(req, res, next) {
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
}

export async function getAllEmployees(req, res, next) {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const sort = (page - 1) * limit;
		const employee = await Employee.find().sort(sort).limit(limit);
		const total = await Employee.countDocuments({ isActive: true });

		return sendSuccess(
			res,
			200,
			{
				employee,
				pagination: { page, limit, total, pages: Math.ceil(total / limit) },
			},
			"successful",
		);
	} catch (err) {
		next(err);
	}
}

// ### Employees
// | Method | Endpoint | Access | Description |
// |---|---|---|---|
// | GET | `/api/employees` | Admin | List employees (paginated) |
// | GET | `/api/employees/:id` | Admin, Self | Get single employee |
// | POST | `/api/employees` | Admin | Create employee |
// | PATCH | `/api/employees/:id` | Admin, Self (limited fields) | Update employee |
// | DELETE | `/api/employees/:id` | Admin | Deactivate (soft delete) |
