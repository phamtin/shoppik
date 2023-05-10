import { z } from 'zod';

import { STATUS } from './owner.entity';

export const RegisterStoreOwnerRequest = z.object({
	userId: z.string(),
	status: z.nativeEnum(STATUS),
});

export const RegisterStoreOwnerResponse = z.object({
	success: z.number(),
});
