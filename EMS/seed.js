import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "./src/models/user.model.js";
import Employee from "./src/models/employees.model.js";

async function seedAdmin() {
	await mongoose.connect(process.env.MONGO_URI);

	const existing = await User.findOne({ isAdmin: true });
	if (existing) {
		console.log("An admin already exists. Skipping seed.");
		return mongoose.disconnect();
	}

	const employee = await Employee.create({
		firstName: "Default",
		lastName: "Admin",
		email: "admin@gmail.com",
		jobTitle: "System Administrator",
		salary: 0,
		isAdmin: true,
	});
	const hashedPassword = await bcrypt.hash("changeme@123", 10);

	const user = await User.create({
		email: employee.email,
		hashedPassword,
		role: "admin",
		employeeId: employee._id,
	});

	console.log("Default admin created:");
	console.log("  email: admin@ems.local");
	console.log("  password: ChangeMe123!");
	console.log("Log in and change this immediately.");

	await mongoose.disconnect();
}

seedAdmin().catch((err) => {
	console.error("seed failed", err);
	process.exit(1);
});
