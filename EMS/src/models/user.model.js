import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		hashedPassword: { type: String, required: true },
		role: { type: String, enum: ["admin", "employee"], default: "employee" },
		refreshToken: { type: String, default: null },
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			unique: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("User", userSchema);
