import { SigninRequest, SigninResponse } from 'Router/auth.route';
import typia from 'typia';

const auth = {
	SigninRequest: typia.createAssert<SigninRequest>(),
	SigninResponse: typia.createAssert<SigninResponse>(),
};

export { auth };
