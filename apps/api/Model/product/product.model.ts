import mongoose, { Types } from 'mongoose';
import { Product } from './product.entity';

export interface ProductModel extends mongoose.Model<ProductDoc> {}

export interface ProductDoc extends mongoose.Document, Product {}

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		storeId: { type: Types.ObjectId },
	},
	{ timestamps: true, toObject: { virtuals: true } },
);

const ProductModel = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export default ProductModel;
