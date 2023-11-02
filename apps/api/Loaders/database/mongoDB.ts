import { AccountSchema, ProductSchema, ShoppikCategory, StoreSchema } from 'Repository/schemas';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://tinpham:VJOVQ9F1E8vXhyVc@cluster0.jyi5oeo.mongodb.net/shoppik?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const db = client.db('app_shoppik');

export const StoreCollection = db.collection<StoreSchema>('stores');

export const AccountCollection = db.collection<AccountSchema>('accounts');

export const ProductCollection = db.collection<ProductSchema>('products');

export const ShoppikCategoryCollection = db.collection<ShoppikCategory>('shoppik_categories');
