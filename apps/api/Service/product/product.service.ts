import { TRPCError } from '@trpc/server';
import { StoreStatusSchema } from '@shoppik/schema';

import { CreateProductRequest, CreateProductResponse } from 'Router/routers/product.route';
import StoreService from 'Service/store/store.service';
import ProductRepo from 'Repository/product.repo';
import { Context } from 'Router/context';

const createProduct = async (ctx: Context, request: CreateProductRequest): Promise<CreateProductResponse> => {
	ctx.systemLog.info('Create new Product - START');

	const store = await StoreService.getMyStore(ctx);

	if (!store ?? store.data?.isDeleted ?? store.data?.storeStatus !== StoreStatusSchema.Enum.ACTIVE) {
		throw new TRPCError({ code: 'BAD_REQUEST' });
	}
	const created = await ProductRepo.createProduct(ctx, request);

	ctx.systemLog.info('Create new Product - END');

	return created;
};

const ProductService = {
	createProduct,
};

export default ProductService;
