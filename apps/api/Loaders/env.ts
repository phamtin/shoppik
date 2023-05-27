import 'dotenv/config';

const schema = {
	type: 'object',
	required: ['NODE_ENV', 'API_HOST', 'API_PORT'],
	properties: {
		NODE_ENV: {
			type: 'string',
			default: 'development',
		},
		LOG_LEVEL: {
			type: 'string',
			default: 'debug',
		},
		API_HOST: {
			type: 'string',
			default: 'localhost',
		},
		API_PORT: {
			type: 'string',
			default: '9000',
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
