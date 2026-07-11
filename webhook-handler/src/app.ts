import express from "express";
import webhookRoute from "./routes/webhook.routes.js";

const app = express();
app.use(express.json());
app.use("/webhook", webhookRoute);

export default app;
