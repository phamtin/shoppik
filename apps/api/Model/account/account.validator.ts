import { z } from 'zod';
import { STATUS } from '../owner/owner.entity';

export const CreateAccountRequest = z.object({
	fullname: z.string(),
	entityId: z.string(),
	status: z.nativeEnum(STATUS),
	managers: z.array(z.string()).min(0).max(100),
});

export const CreateAccountResponse = z.object({
	success: z.number(),
});

export const GetAccountsRequest = z.object({
	greeting: z.string(),
});

export const GetAccountsResponse = z.object({
	greeting: z.string(),
});
