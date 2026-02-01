import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { validateIdParam, validateRequest } from "@/common/utils/httpHandlers";
import { createApiResponse } from "@/modules/api-docs/openAPIResponseBuilders";
import { userController } from "@/modules/user/user.controller";
import { CreateUserDtoSchema, UpdateUserDtoSchema, UserResponseDtoSchema } from "@/modules/user/user.dto";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

// Get all users
userRegistry.registerPath({
	method: "get",
	path: "/users",
	tags: ["Users"],
	responses: createApiResponse(z.array(UserResponseDtoSchema), "Success"),
});

userRouter.get("/", userController.getAllUsers.bind(userController));

// Get user by ID
userRegistry.registerPath({
	method: "get",
	path: "/users/{id}",
	tags: ["Users"],
	responses: createApiResponse(UserResponseDtoSchema, "Success"),
});

userRouter.get("/:id", validateIdParam(), userController.getUserById.bind(userController));

// Create user
userRegistry.registerPath({
	method: "post",
	path: "/users",
	tags: ["Users"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: CreateUserDtoSchema,
				},
			},
		},
	},
	responses: createApiResponse(UserResponseDtoSchema, "Success"),
});

userRouter.post("/", validateRequest(CreateUserDtoSchema), userController.createUser.bind(userController));

// Update user
userRegistry.registerPath({
	method: "put",
	path: "/users/{id}",
	tags: ["Users"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: UpdateUserDtoSchema,
				},
			},
		},
	},
	responses: createApiResponse(UserResponseDtoSchema, "Success"),
});

userRouter.put(
	"/:id",
	validateIdParam(),
	validateRequest(UpdateUserDtoSchema),
	userController.updateUser.bind(userController),
);

// Delete user
userRegistry.registerPath({
	method: "delete",
	path: "/users/{id}",
	tags: ["Users"],
	responses: createApiResponse(z.null(), "Success"),
});

userRouter.delete("/:id", validateIdParam(), userController.deleteUser.bind(userController));
