import { createAssert } from 'typia';
import { CreateStoreResponse, CreateStoreRequest, GetMyStoreResponse, UpdateStoreRequest, UpdateStoreResponse } from 'Router/store.route';

const store = {
	CreateStoreResponse: createAssert<CreateStoreResponse>(),
	CreateStoreRequest: createAssert<CreateStoreRequest>(),
	GetMyStoreResponse: createAssert<GetMyStoreResponse>(),
	UpdateStoreRequest: createAssert<UpdateStoreRequest>(),
	UpdateStoreResponse: createAssert<UpdateStoreResponse>(),
};

export { store };
