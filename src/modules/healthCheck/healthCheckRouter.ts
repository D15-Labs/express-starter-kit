import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/modules/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
	method: "get",
	path: "/health",
	tags: ["Health Check"],
	responses: createApiResponse(z.null(), "Success"),
});

healthCheckRouter.get("/", (_req: Request, res: Response) => {
	const serviceResponse = ServiceResponse.success("Service is healthy", null);
	res.status(serviceResponse.statusCode).send(serviceResponse);
});
