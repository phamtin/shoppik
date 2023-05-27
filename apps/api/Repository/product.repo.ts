import makeBaseRepo from './base';
import ProductModel from '../Model/product/product.model';

const createProduct = (id?: string): string => {
	return '';
};

const getProducts = (id?: string): boolean => {
	return true;
};

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const makeProductRepo = () => {
	return Object.freeze({
		createProduct,
		getProducts,
		...makeBaseRepo(ProductModel),
	});
};

export type IProductRepo = ReturnType<typeof makeProductRepo>;

export default makeProductRepo;
