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

		department: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Department",
			default: null,
		},
		manager: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			default: null,
		},
	},
	{ timestamps: true },
);

// Handy for listing an employee's direct reports without a separate query pattern
employeeSchema.virtual("reports", {
	ref: "Employee",
	localField: "_id",
	foreignField: "manager",
});

employeeSchema.set("toJSON", { virtuals: true });
employeeSchema.set("toObject", { virtuals: true });

export default mongoose.model("Employee", employeeSchema);
