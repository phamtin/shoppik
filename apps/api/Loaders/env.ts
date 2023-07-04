import 'dotenv/config';

const schema = {
	type: 'object',
	required: ['ACCESS_TOKEN_PUBLIC_KEY', 'ACCESS_TOKEN_PRIVATE_KEY', 'NODE_ENV', 'API_PORT', 'AUTH_SECRET'],
	properties: {
		NODE_ENV: {
			type: 'string',
			default: 'development',
		},
		AUTH_SECRET: {
			type: 'string',
			default: 'AUTH_SECRET',
		},
		API_PORT: {
			type: 'string',
			default: '9000',
		},
		ACCESS_TOKEN_PRIVATE_KEY: {
			type: 'string',
			default: 'ACCESS_TOKEN_PRIVATE_KEY',
		},
		ACCESS_TOKEN_PUBLIC_KEY: {
			type: 'string',
			default: 'ACCESS_TOKEN_PRIVATE_KEY',
		},
	},
};

const options = {
	confKey: 'config',
	dotenv: true,
	schema: schema,
	data: process.env,
};

export default options;
