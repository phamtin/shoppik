import {
	CreateProductRequest,
	CreateProductResponse,
	GetProductDetailRequest,
	GetProductDetailResponse,
	GetShoppikCategoryResponse,
	GetStoreProductsRequest,
	GetStoreProductsResponse,
} from 'Router/product.route';
import { createAssert } from 'typia';

const product = {
	CreateProductRequest: createAssert<CreateProductRequest>(),
	CreateProductResponse: createAssert<CreateProductResponse>(),
	GetShoppikCategoryResponse: createAssert<GetShoppikCategoryResponse>(),
	GetStoreProductsResponse: createAssert<GetStoreProductsResponse>(),
	GetStoreProductsRequest: createAssert<GetStoreProductsRequest>(),
	GetProductDetailRequest: createAssert<GetProductDetailRequest>(),
	GetProductDetailResponse: createAssert<GetProductDetailResponse>(),
};

export { product };
