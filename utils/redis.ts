import { Redis } from "ioredis";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const redisClient = () => {
	if (process.env.UPSTASH_REDIS_URI) {
		console.log("Upstash redis connected successfully");
		return process.env.UPSTASH_REDIS_URI;
	}

	throw new Error("redis connection failed");
};

const redis = new Redis(redisClient());

export { redis };
