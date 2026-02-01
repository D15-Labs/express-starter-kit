import { z } from "zod";

// Request DTOs
export const CreateUserDtoSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name too long")
		.regex(/^[a-zA-Z0-9\s\-_.']+$/, "Name contains invalid characters"),
	email: z.string().email("Invalid email format").max(255, "Email too long"),
});

export const UpdateUserDtoSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name too long")
		.regex(/^[a-zA-Z0-9\s\-_.']+$/, "Name contains invalid characters")
		.optional(),
	email: z.string().email("Invalid email format").max(255, "Email too long").optional(),
});

// Response DTOs
export const UserResponseDtoSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// Types
export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
export type UserResponseDto = z.infer<typeof UserResponseDtoSchema>;
