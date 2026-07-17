import Redis from "ioredis";
import "dotenv/config";

const redis = new Redis(process.env.REDIS_URL);
redis.on("connect", () => {
	console.log("redis connected...");
});
redis.on("error", (err) => {
	console.error("there was an error with redis...", err);
});

export default redis;
