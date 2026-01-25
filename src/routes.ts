import { type Express } from "express";
import { healthCheckRouter } from "@/modules/healthCheck/healthCheckRouter";
import { userRouter } from "@/modules/user/user.route";

export function setupRoutes(app: Express): void {
	// Routes
	app.use("/health-check", healthCheckRouter);
	app.use("/users", userRouter);
}