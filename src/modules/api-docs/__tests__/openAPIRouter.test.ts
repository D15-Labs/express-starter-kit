import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { app } from "@/server";

import { generateOpenAPIDocument } from "@/modules/api-docs/openAPIDocumentGenerator";

describe("OpenAPI Router", () => {
	describe("Swagger JSON route", () => {
		it("should return Swagger JSON content", async () => {
			// Arrange
			const expectedResponse = generateOpenAPIDocument();

			// Act
			const response = await request(app).get("/api-docs/swagger.json");

			// Assert
			expect(response.status).toBe(StatusCodes.OK);
			expect(response.type).toBe("application/json");
			expect(response.body).toEqual(expectedResponse);
		});

		it("should serve the Swagger UI", async () => {
			// Act
			const response = await request(app).get("/api-docs/");

			// Assert
			expect(response.status).toBe(StatusCodes.OK);
			expect(response.text).toContain("swagger-ui");
		});
	});
});
