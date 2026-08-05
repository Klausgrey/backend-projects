import "dotenv/config";
import app from "./app.js";
import { connectToMongoDB } from "./src/config/db.js";

const PORT = process.env.PORT || 4000;


async function startServer() {
	await connectToMongoDB();
	app.listen(PORT, () => console.log("server is running..."));
}

startServer();
