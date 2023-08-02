import slugify from 'slugify';
import { Contact, StoreAddress, StoreStatusSchema } from '@shoppik/schema';
import { CreateStoreRequest, CreateStoreResponse, GetMyStoreResponse, UpdateStoreRequest, UpdateStoreResponse } from '../Router/routers/store.route';
import { Context } from '../Router/context';
import { TRPCError } from '@trpc/server';

const createStore = async (ctx: Context, request: CreateStoreRequest): Promise<CreateStoreResponse> => {
	const db = ctx.prisma.store;

	if (!ctx.user?.id) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	const fullStoreAddress: StoreAddress = {
		province: request.storeAddress.province,
		district: request.storeAddress.district,
		ward: request.storeAddress.ward,
		street: request.storeAddress.street,
		note: '',
	};

	const createdStore = await db.create({
		data: {
			name: request.name,
			ownerId: ctx.user.id,
			avatar: request.avatar,
			contact: request.contact,
			tradeName: request.tradeName,
			description: request.description,
			landingPageUrl: request.landingPageUrl,
			slug: slugify(request.name),
			storeAddress: fullStoreAddress,
			storeStatus: StoreStatusSchema.Enum.ACTIVE,
			rating: { score: 5, reviews: 0, responseTime: 99 },
			tags: request.tags,
			createdAt: new Date(),
			isDeleted: false,
		},
	});

	return createdStore;
};

const getMyStore = async (ctx: Context): Promise<GetMyStoreResponse> => {
	const storerepo = ctx.prisma.store;

	const store = await storerepo.findFirst({
		where: {
			ownerId: ctx.user?.id,
		},
	});

	return { data: store };
};

const updateMyStore = async (ctx: Context, request: UpdateStoreRequest): Promise<UpdateStoreResponse> => {
	const db = ctx.prisma.store;

	const currentStore = await db.findUnique({
		where: { id: ctx.user?.roleOwner.storeId },
	});
	if (!currentStore?.id ?? currentStore.storeStatus !== StoreStatusSchema.enum.ACTIVE) {
		throw new TRPCError({ code: 'BAD_REQUEST' });
	}

	const contactOrNot: Contact = {
		email: request.contact?.email ?? currentStore.contact.email,
		phone: request.contact?.phone ?? currentStore.contact.phone,
		instagramLink: request.contact?.instagramLink ?? currentStore.contact.instagramLink,
		facebookLink: request.contact?.facebookLink ?? currentStore.contact.facebookLink,
		youtubeLink: request.contact?.youtubeLink ?? currentStore.contact.youtubeLink,
	};
	const addressOrNot: StoreAddress = {
		province: request.storeAddress?.province ?? currentStore.storeAddress.province,
		district: request.storeAddress?.district ?? currentStore.storeAddress.district,
		ward: request.storeAddress?.ward ?? currentStore.storeAddress.ward,
		street: request.storeAddress?.street ?? currentStore.storeAddress.street,
		note: request.storeAddress?.note ?? currentStore.storeAddress.note,
	};

	const updated = await db.update({
		where: {
			id: ctx.user?.roleOwner.storeId,
		},
		data: {
			...request,
			contact: contactOrNot,
			storeAddress: addressOrNot,
		},
		include: true,
	});

	return updated;
};

const StoreRepo = Object.freeze({ createStore, getMyStore, updateMyStore });

export default StoreRepo;
