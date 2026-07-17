import { Worker } from "bullmq";
import redis from "../config/redis.js";

const worker = new Worker(
	async (job) => {
		console.log(`job processing ${job.id}`, job.data);

		await new Promise((resolver) => setTimeout(resolver, 5000));

		return { result: "job completed..." };
	},
	{ redis },
);

worker.on("completed", (job) => {
	console.log(`Job ${job.id} completed...`);
});
worker.on("failed", (job, err) => {
	console.log(`Job ${job.id} failed...`, err);
});

export default worker;
