import express from "express";
const app = express();

app.get("/health", async (req, res) => {
	res
		.status(200)
		.json({
			status: "okay",
			message: "This is a health check no need to worry",
		});
});
export default app;
