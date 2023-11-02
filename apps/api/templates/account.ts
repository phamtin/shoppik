import { GetMyProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from 'Router/user.route';
import { createAssert } from 'typia';

const account = {
	GetMyProfileResponse: createAssert<GetMyProfileResponse>(),
	UpdateUserProfileRequest: createAssert<UpdateUserProfileRequest>(),
	UpdateUserProfileResponse: createAssert<UpdateUserProfileResponse>(),
};

export { account };
