import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { env } from "@/common/utils/envConfig";

import { apiRegistries } from "@/routes";

export type OpenAPIDocument = ReturnType<OpenApiGeneratorV3["generateDocument"]>;

export function generateOpenAPIDocument(): OpenAPIDocument {
	const registry = new OpenAPIRegistry(apiRegistries);
	const generator = new OpenApiGeneratorV3(registry.definitions);

	return generator.generateDocument({
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "Swagger API",
		},
		servers: [
			{
				url: env.BASE_URL,
			},
		],
		externalDocs: {
			description: "View the raw OpenAPI Specification in JSON format",
			url: "/api-docs/swagger.json",
		},
	});
}
