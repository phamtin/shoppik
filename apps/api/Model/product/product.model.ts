import mongoose from 'mongoose';
import { Product } from './product.entity';
import { Types } from 'mongoose';

const productSchema = new mongoose.Schema<Product>(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		storeId: { type: Types.ObjectId },
	},
	{ timestamps: true, toObject: { virtuals: true } },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
