import { z } from 'zod';
import { STATUS } from '../entity/entity.entity';

export const CreateUserRequest = z.object({
	fullname: z.string(),
	entityId: z.string(),
	status: z.nativeEnum(STATUS),
	managers: z.array(z.string()).min(0).max(100),
});

export const CreateUserResponse = z.object({
	success: z.number(),
});

export const GetUsersRequest = z.object({
	greeting: z.string(),
});

export const GetUsersResponse = z.object({
	greeting: z.string(),
});
