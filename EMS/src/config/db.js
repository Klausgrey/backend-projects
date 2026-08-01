import mongoose from "mongoose";
import "dotenv/config";

export async function connectToMongoDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("You successfully connected to MongoDB!");
	} catch (err) {
		console.error("MongoDB connection error:", err);
		process.exit(1);
	}
}

export async function disconnectFromMongoDB() {
	await mongoose.disconnect();
}
