import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		phone: { type: String },
		dob: { type: Date },
		address: { type: String },
		hireDate: { type: Date, default: Date.now },
		jobTitle: { type: String, required: true },
		salary: { type: Number, required: true },
		isActive: { type: Boolean, default: true },
		idAdmin: { type: Boolean, default: false },

		department: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Department",
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Employee", employeeSchema);
