import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { ServiceResponse } from "@/common/models/serviceResponse";
import type { User } from "@/modules/user/user.model";
import { app } from "@/server";
import { pool } from "@/database/pgConnection";

describe("User API endpoints", () => {
	beforeEach(async () => {
		// Clean up the database before each test
		await pool.query("DELETE FROM users");
	});

	describe("GET /users", () => {
		it("should return empty array when no users exist", async () => {
			const response = await request(app).get("/users");
			const result: ServiceResponse<User[]> = response.body;

			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.responseObject).toEqual([]);
			expect(result.message).toEqual("Users retrieved successfully");
		});
	});

	describe("POST /users", () => {
		it("should create a new user", async () => {
			const userData = {
				name: "John Doe",
				email: "john.doe@example.com",
			};

			const response = await request(app)
				.post("/users")
				.send(userData);
			const result: ServiceResponse<User> = response.body;

			expect(response.statusCode).toEqual(StatusCodes.CREATED);
			expect(result.success).toBeTruthy();
			expect(result.responseObject).toMatchObject(userData);
			expect(result.responseObject?.id).toBeDefined();
			expect(result.message).toEqual("User created successfully");
		});

		it("should return validation error for invalid email", async () => {
			const userData = {
				name: "John Doe",
				email: "invalid-email",
			};

			const response = await request(app)
				.post("/users")
				.send(userData);
			const result: ServiceResponse = response.body;

			expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
			expect(result.success).toBeFalsy();
			expect(result.message).toContain("Validation error");
			expect(result.message).toContain("Invalid email");
		});

		it("should return validation error for missing name", async () => {
			const userData = {
				email: "john.doe@example.com",
			};

			const response = await request(app)
				.post("/users")
				.send(userData);
			const result: ServiceResponse = response.body;

			expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
			expect(result.success).toBeFalsy();
			expect(result.message).toContain("Validation error");
			expect(result.message).toContain("Required");
		});
	});

	describe("GET /users/:id", () => {
		it("should return user by id", async () => {
			// First create a user
			const userData = {
				name: "Jane Doe",
				email: "jane.doe@example.com",
			};

			const createResponse = await request(app)
				.post("/users")
				.send(userData);
			const createdUser: User = createResponse.body.responseObject;

			// Then get the user by id
			const response = await request(app).get(`/users/${createdUser.id}`);
			const result: ServiceResponse<User> = response.body;

			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.responseObject).toMatchObject(userData);
			expect(result.message).toEqual("User retrieved successfully");
		});

		it("should return 404 for non-existent user", async () => {
			const response = await request(app).get("/users/99999");
			const result: ServiceResponse = response.body;

			expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(result.success).toBeFalsy();
			expect(result.message).toEqual("User not found");
		});
	});

	describe("PUT /users/:id", () => {
		it("should update user", async () => {
			// First create a user
			const userData = {
				name: "Bob Smith",
				email: "bob.smith@example.com",
			};

			const createResponse = await request(app)
				.post("/users")
				.send(userData);
			const createdUser: User = createResponse.body.responseObject;

			// Then update the user
			const updateData = {
				name: "Bob Updated",
				email: "bob.updated@example.com",
			};

			const response = await request(app)
				.put(`/users/${createdUser.id}`)
				.send(updateData);
			const result: ServiceResponse<User> = response.body;

			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.responseObject).toMatchObject(updateData);
			expect(result.message).toEqual("User updated successfully");
		});

		it("should return 404 when updating non-existent user", async () => {
			const updateData = {
				name: "Non-existent User",
			};

			const response = await request(app)
				.put("/users/99999")
				.send(updateData);
			const result: ServiceResponse = response.body;

			expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(result.success).toBeFalsy();
			expect(result.message).toEqual("User not found");
		});
	});

	describe("DELETE /users/:id", () => {
		it("should delete user", async () => {
			// First create a user
			const userData = {
				name: "Alice Johnson",
				email: "alice.johnson@example.com",
			};

			const createResponse = await request(app)
				.post("/users")
				.send(userData);
			const createdUser: User = createResponse.body.responseObject;

			// Then delete the user
			const response = await request(app).delete(`/users/${createdUser.id}`);
			const result: ServiceResponse = response.body;

			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.message).toEqual("User deleted successfully");

			// Verify user is deleted
			const getResponse = await request(app).get(`/users/${createdUser.id}`);
			expect(getResponse.statusCode).toEqual(StatusCodes.NOT_FOUND);
		});

		it("should return 404 when deleting non-existent user", async () => {
			const response = await request(app).delete("/users/99999");
			const result: ServiceResponse = response.body;

			expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(result.success).toBeFalsy();
			expect(result.message).toEqual("User not found");
		});
	});
});