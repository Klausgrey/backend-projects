import Department from "../models/department.models.js";

export async function createDepartment(req, res, next) {
	try {
		const { name } = req.body;
		const data = await Department.create({ name: name });
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
