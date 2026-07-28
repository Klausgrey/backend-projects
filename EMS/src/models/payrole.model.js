import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
	{
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},
		periodStart: { type: Date, required: true },
		periodEnd: { type: Date, required: true },
		baseSalary: { type: Number, required: true },
		deductions: { type: Number, default: 0 },
		netPay: { type: Number, required: true },
		generatedAt: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);

export default mongoose.model("Payroll", payrollSchema);
