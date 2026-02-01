import { type Express } from "express";
import { healthCheckRouter } from "@/modules/healthCheck/healthCheck.route";
import { openAPIRouter } from "@/modules/api-docs/openAPI.route";
import { userRouter } from "@/modules/user/user.route";
import { healthCheckRegistry } from "@/modules/healthCheck/healthCheck.route";
import { userRegistry } from "@/modules/user/user.route";

export const apiRegistries = [healthCheckRegistry, userRegistry];

export function setupRoutes(app: Express): void {
	// Routes
	app.use("/health-check", healthCheckRouter);
	app.use("/api-docs", openAPIRouter);
	app.use("/users", userRouter);
}