import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
	{
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},
		date: { type: Date, default: Date.now },
		clockIn: { type: Date, default: null },
		clockOut: { type: Date, default: null },
	},
	{ timestamps: true },
);

attendanceSchema.index({ employee: 1, date: 1 });

export default mongoose.model("Attendance", attendanceSchema);
