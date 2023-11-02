import { Context } from 'Router/routers/context';
import slugify from 'slugify';
import { TRPCError } from '@trpc/server';
import { Contact, StoreAddress, StoreSchema, StoreStatus } from 'Repository/schemas';
import { CreateStoreRequest, CreateStoreResponse, GetMyStoreResponse, UpdateStoreRequest, UpdateStoreResponse } from 'Router/store.route';
import { StoreCollection } from 'Loaders/database/mongoDB';
import { ObjectId } from 'mongodb';

const createStore = async (ctx: Context, request: CreateStoreRequest): Promise<CreateStoreResponse> => {
	const fullStoreAddress: StoreAddress = {
		province: request.storeAddress.province,
		district: request.storeAddress.district,
		ward: request.storeAddress.ward,
		street: request.storeAddress.street,
		note: '',
	};
	const newId = new ObjectId();

	const payload: StoreSchema = {
		_id: newId,
		name: request.name,
		ownerId: ctx.user._id,
		avatar: request.avatar,
		contact: request.contact,
		slug: slugify(request.name),
		tradeName: request.tradeName,
		followers: [],
		following: [],
		tags: request.tags.map((t) => ({ ...t, _id: new ObjectId(t._id) })),
		storeAddress: fullStoreAddress,
		description: request.description,
		landingPageUrl: request.landingPageUrl,
		storeStatus: StoreStatus.ACTIVE,
		rating: { score: 5, reviews: 0, responseTime: 99 },
		isDeleted: false,
		createdAt: new Date(),
	};

	const { acknowledged, insertedId } = await StoreCollection.insertOne({
		...payload,
	});
	if (!acknowledged) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	return {
		insertedId: insertedId.toHexString(),
	};
};

const getMyStore = async (ctx: Context): Promise<GetMyStoreResponse> => {
	let res: GetMyStoreResponse = {
		data: null,
	};

	const store = await StoreCollection.findOne({
		ownerId: ctx.user._id,
	});
	if (!store) {
		return res;
	}
	res = {
		data: {
			...store,
			_id: store._id.toHexString(),
			ownerId: store.ownerId.toHexString(),
			tags: store.tags.map((c) => ({ ...c, _id: c._id.toHexString() })),
		},
	};

	return res;
};

const updateMyStore = async (ctx: Context, request: UpdateStoreRequest): Promise<UpdateStoreResponse> => {
	if (!ctx.user.roleOwner) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	const { name, contact, storeAddress } = request;

	const currentStore = await StoreCollection.findOne({
		_id: ctx.user?.roleOwner.storeId,
	});
	if (!currentStore?._id.toHexString() ?? currentStore.storeStatus !== StoreStatus.ACTIVE) {
		throw new TRPCError({ code: 'BAD_REQUEST' });
	}

	const phoneUpdate = [];
	for (const numb of contact?.phone || []) {
		if (numb) phoneUpdate.push(numb);
	}
	const updateContact: Contact = {
		email: contact?.email ?? currentStore.contact.email,
		phone: phoneUpdate.length ? phoneUpdate : currentStore.contact.phone,
		youtubeLink: contact?.youtubeLink ?? currentStore.contact.youtubeLink,
		facebookLink: contact?.facebookLink ?? currentStore.contact.facebookLink,
		instagramLink: contact?.instagramLink ?? currentStore.contact.instagramLink,
	};
	const updateAddress: StoreAddress = {
		province: storeAddress?.province ?? currentStore.storeAddress.province,
		district: storeAddress?.district ?? currentStore.storeAddress.district,
		ward: storeAddress?.ward ?? currentStore.storeAddress.ward,
		street: storeAddress?.street ?? currentStore.storeAddress.street,
		note: storeAddress?.note ?? currentStore.storeAddress.note,
	};
	const updateSlug = name ? slugify(name) : currentStore.slug;

	await StoreCollection.findOneAndUpdate(
		{
			_id: new ObjectId(ctx.user.roleOwner.storeId),
		},
		{
			$set: {
				...request,
				slug: updateSlug,
				contact: updateContact,
				storeAddress: updateAddress,
				tags: [],
			},
		},
		{ ignoreUndefined: true },
	);

	return { res: true };
};

const StoreRepo = Object.freeze({ createStore, getMyStore, updateMyStore });

export default StoreRepo;
