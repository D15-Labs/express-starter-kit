import { type Express } from "express";
import { healthCheckRouter } from "@/modules/healthCheck/healthCheckRouter";

export function setupRoutes(app: Express): void {
	// Routes
	app.use("/health-check", healthCheckRouter);
}