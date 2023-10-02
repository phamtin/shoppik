import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';

const AppError: Record<TRPC_ERROR_CODE_KEY, string> = {
	TIMEOUT: 'Request is timeout.',
	NOT_FOUND: 'Resource not found.',
	FORBIDDEN: 'Access denied.',
	BAD_REQUEST: 'Bad request',
	PARSE_ERROR: 'Server parse data failed',
	UNAUTHORIZED: 'Session has expired.',
	NOT_IMPLEMENTED: "Feature hasn't implemented yet.",
	TOO_MANY_REQUESTS: 'Too many request.',
	INTERNAL_SERVER_ERROR: 'Something went wrong!',
	METHOD_NOT_SUPPORTED: "Requested method isn't supported now.",
	CONFLICT: 'CONFLICT',
	PAYLOAD_TOO_LARGE: 'PAYLOAD_TOO_LARGE',
	PRECONDITION_FAILED: 'PRECONDITION_FAILED',
	CLIENT_CLOSED_REQUEST: 'CLIENT_CLOSED_REQUEST',
	UNPROCESSABLE_CONTENT: 'UNPROCESSABLE_CONTENT',
};

export default AppError;
