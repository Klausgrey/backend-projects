import { Queue } from "bullmq";
import redis from "../config/redis.js";
export const queues = new Queue("notifications", { connection: redis });
