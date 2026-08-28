import Department from "../models/department.models.js";
import Employee from "../models/employees.model.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function createDepartment(req, res, next) {
	try {
		const { name } = req.body;
		const existing = await Department.findOne({ name });
		if (existing) return sendError(res, 409, "User already exists");
		const data = await Department.create({ name });
		return sendSuccess(res, 201, data, "Department created successfully");
	} catch (err) {
		next(err);
	}
}

export async function getDepartments(req, res, next) {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;
		const data = await Department.find().skip(skip).limit(limit);
		const total = await Department.countDocuments();
		return sendSuccess(
			res,
			200,
			{
				data,
				pagination: { page, limit, total, pages: Math.ceil(total / limit) },
			},
			"All the departments",
		);
	} catch (err) {
		next(err);
	}
}

export async function getDepartmentsById(req, res, next) {
	const departmentId = req.params.id;
	try {
		const department = await Department.findById(departmentId);
		if (!department) return sendError(res, 404, "this ID is not found");
		const employee = await Employee.find({ department: departmentId }).select(
			"-isAdmin, -salary",
		);
		return sendSuccess(res, 200, { employee, department }, "Department found");
	} catch (err) {
		next(err);
	}
}

export async function updateDepartment(req, res, next) {
	const departmentId = req.params.id;
	try {
		const { name } = req.body;
		if (name) {
			const existing = await Department.findOne({
				name,
				_id: { $ne: departmentId },
			});
			if (existing)
				return sendError(res, 409, "This department already exists");
		}
		const data = await Department.findByIdAndUpdate(
			departmentId,
			{ name },
			{ new: true, runValidators: true },
		);
		if (!data) return sendError(res, 404, "department name not found");
		return sendSuccess(res, 200, data, "Department name updated successfully");
	} catch (err) {
		next(err);
	}
}
export async function deleteDepartment(req, res, next) {
	const { departmentId } = req.params.id;

	try {
		const data = await Department.findByIdAndDelete(departmentId, {
			new: true,
		});
		if (!data) return sendError(res, 404, "Department not found");
		return sendSuccess(res, 200, data, "Deleted...");
	} catch (err) {
		next(err);
	}
}
// ### Departments
// | Method | Endpoint | Access | Description |
// |---|---|---|---|
// | GET | `/api/departments` | Authenticated | List all departments |
// | GET | `/api/departments/:id` | Authenticated | Get department + its employees |
// | POST | `/api/departments` | Admin | Create department |
// | PATCH | `/api/departments/:id` | Admin | Update department name |
// | DELETE | `/api/departments/:id` | Admin | Delete department |
