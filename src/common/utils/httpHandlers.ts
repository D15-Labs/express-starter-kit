import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

import { ServiceResponse } from "@/common/models/serviceResponse";

export const validateRequest = (schema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		req.body = schema.parse(req.body);
		next();
	} catch (err) {
		const error = err as z.ZodError;
		const statusCode = StatusCodes.BAD_REQUEST;
		const serviceResponse = ServiceResponse.failure(`Validation error: ${error.message}`, null, statusCode);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	}
};

declare global {
	namespace Express {
		interface Request {
			parsedId?: number;
		}
	}
}

export const validateIdParam = (paramName = "id") => async (req: Request, res: Response, next: NextFunction) => {
	const id = Array.isArray(req.params[paramName]) ? req.params[paramName][0] : req.params[paramName];
	const parsedId = Number.parseInt(id, 10);

	if (Number.isNaN(parsedId) || parsedId <= 0) {
		const statusCode = StatusCodes.BAD_REQUEST;
		const serviceResponse = ServiceResponse.failure(
			`Validation error: Invalid ${paramName} format. Must be a positive integer.`,
			null,
			statusCode,
		);
		res.status(serviceResponse.statusCode).send(serviceResponse);
		return;
	}

	// Add the parsed ID to the request for easier access
	req.parsedId = parsedId;
	next();
};
