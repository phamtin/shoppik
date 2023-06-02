import makeBaseRepo from './base';
import StoreModel from '../Model/store/store.model';
import { Store } from '../Model/store/store.entity';

const getMyStore = (id?: string): boolean => {
	return !!id;
};

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const makeStoreRepo = () => {
	return Object.freeze({
		getMyStore,
		...makeBaseRepo<Store>(StoreModel),
	});
};

export type IProductRepo = ReturnType<typeof makeStoreRepo>;

export default makeStoreRepo;
