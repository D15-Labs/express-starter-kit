import type { Request, Response } from "express";

import type { CreateUserDto, UpdateUserDto } from "@/modules/user/user.dto";
import { userService } from "@/modules/user/user.service";

export class UserController {
	async getAllUsers(req: Request, res: Response): Promise<void> {
		const serviceResponse = await userService.findAll();
		res.status(serviceResponse.statusCode).send(serviceResponse);
	}

	async getUserById(req: Request, res: Response): Promise<void> {
		const id = req.parsedId as number;
		const serviceResponse = await userService.findById(id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	}

	async createUser(req: Request, res: Response): Promise<void> {
		const createUserDto: CreateUserDto = req.body;
		const serviceResponse = await userService.create(createUserDto);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	}

	async updateUser(req: Request, res: Response): Promise<void> {
		const id = req.parsedId as number;
		const updateUserDto: UpdateUserDto = req.body;
		const serviceResponse = await userService.update(id, updateUserDto);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	}

	async deleteUser(req: Request, res: Response): Promise<void> {
		const id = req.parsedId as number;
		const serviceResponse = await userService.delete(id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	}
}

export const userController = new UserController();
