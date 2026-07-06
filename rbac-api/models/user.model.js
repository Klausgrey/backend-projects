import mongoose, { version } from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { type: String, unique: true, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["user", "admin", "moderator"],
			default: "user",
		},
	},
	{ versionKey: false },
);

export const User = mongoose.model("User", userSchema);
