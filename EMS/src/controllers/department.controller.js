import Department from "../models/department.models.js";
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
// ### Departments
// | Method | Endpoint | Access | Description |
// |---|---|---|---|
// | GET | `/api/departments` | Authenticated | List all departments |
// | GET | `/api/departments/:id` | Authenticated | Get department + its employees |
// | POST | `/api/departments` | Admin | Create department |
// | PATCH | `/api/departments/:id` | Admin | Update department name |
// | DELETE | `/api/departments/:id` | Admin | Delete department |
