import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "@/common/models/serviceResponse";

export const validateRequest = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		req.body = schema.parse(req.body);
		next();
	} catch (err) {
		const error = err as ZodError;
		const statusCode = StatusCodes.BAD_REQUEST;
		const serviceResponse = ServiceResponse.failure(`Validation error: ${error.message}`, null, statusCode);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	}
};
