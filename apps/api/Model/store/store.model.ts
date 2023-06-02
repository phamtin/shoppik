import mongoose from 'mongoose';

import { Store as StoreModel, STORE_STATUS } from './store.entity';

const { ObjectId } = mongoose.Schema.Types;

const storeSchema = new mongoose.Schema<StoreModel>(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true },
		tradeName: { type: String, required: true },
		description: { type: String, maxlength: 2048, required: true },
		ownerId: { type: ObjectId, ref: 'Account', required: true },
		following: [{ type: ObjectId, ref: 'Account', required: true }],
		followers: [{ type: ObjectId, ref: 'Account', required: true }],
		tags: [{ type: ObjectId, ref: 'Tag', required: true }],
		avatar: { type: String, required: true },
		landingPageUrl: { type: String, required: true },

		rating: {
			score: {
				type: Number,
				default: 5,
			},
			reviews: {
				type: Number,
				default: 0,
			},
			responseTime: {
				type: Number,
				default: 99, //	percent
			},
		},

		contact: {
			phone: {
				type: [String],
				required: true,
			},
			youtubeLink: String,
			facebookLink: String,
			instagramLink: String,
		},

		storeStatus: { type: String, enum: Object.values(STORE_STATUS) },
		isDeleted: { type: Boolean, default: false },
		DeletedAt: { type: Date, default: undefined },
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const StoreModel = mongoose.model<StoreModel>('Store', storeSchema);

export default StoreModel;
