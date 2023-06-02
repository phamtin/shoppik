import { z } from 'zod';

export enum STORE_STATUS {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	CLOSED = 'CLOSED',
	DELETED = 'DELETED',
}

export const z_Store = z.object({
	id: z.string().nullable().optional(),
	name: z.string(),
	slug: z.string(),
	tradeName: z.string().min(1).max(256),
	description: z.string().max(2048),
	landingPageUrl: z.string(),
	avatar: z.string(),
	ownerId: z.instanceof(Object),
	following: z.array(z.instanceof(Object)),
	followers: z.array(z.instanceof(Object)),
	tags: z.array(z.instanceof(Object)).min(1).max(32),

	rating: z.object({
		score: z.number(),
		reviews: z.number(),
		responseTime: z.number(),
	}),

	contact: z.object({
		phone: z.array(z.string()).min(1),
		youtubeLink: z.string(),
		facebookLink: z.string(),
		instagramLink: z.string(),
	}),

	storeStatus: z.nativeEnum(STORE_STATUS),
	isDeleted: z.boolean(),
	DeletedAt: z.date().nullable().optional(),

	createdAt: z.date(),
	updatedAt: z.date(),
});

export type Store = z.infer<typeof z_Store>;
