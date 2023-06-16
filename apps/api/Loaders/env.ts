import 'dotenv/config';

const schema = {
	type: 'object',
	required: ['NODE_ENV', 'API_HOST', 'API_PORT'],
	properties: {
		DATABASE_URL: {
			type: 'string',
			default: '',
		},
		NODE_ENV: {
			type: 'string',
			default: 'development',
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
