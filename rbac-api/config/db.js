import mongoose from "mongoose";
import "dotenv/config";

export const connectMG = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
		return;
	}
};
