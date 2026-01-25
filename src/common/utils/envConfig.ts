import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("production"),

	HOST: z.string().default("localhost"),

	PORT: z.coerce.number().int().positive().default(8080),

	BASE_URL: z.string().default("http://localhost:8080"),

	CORS_ORIGIN: z.string().default("http://localhost:8080"),

	DATABASE_URL: z.string().min(1).default("postgres://username:password@localhost:5432/database"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid environment variables:", parsedEnv.error.format());
	throw new Error("Invalid environment variables");
}

let HOST = parsedEnv.data.HOST;
let PORT = parsedEnv.data.PORT;

try {
	const baseUrl = new URL(parsedEnv.data.BASE_URL);
	HOST = baseUrl.hostname;
	PORT = baseUrl.port ? parseInt(baseUrl.port) : (baseUrl.protocol === "https:" ? 443 : 80);
} catch {
	// fallback to HOST and PORT
}

export const env = {
	...parsedEnv.data,
	HOST,
	PORT,
	isDevelopment: parsedEnv.data.NODE_ENV === "development",
	isProduction: parsedEnv.data.NODE_ENV === "production",
	isTest: parsedEnv.data.NODE_ENV === "test",
};
