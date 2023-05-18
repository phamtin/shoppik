import mongoose, { Mongoose, MongooseOptions } from 'mongoose';

import systemLog from '../Pkgs/systemLog';

class MongoDb {
	instance: Mongoose | undefined = undefined;
	options: MongooseOptions;
	url: string = '';

	constructor(options: MongooseOptions) {
		this.options = options || {};
		this.url = 'mongodb://mongodb:27017';
		this._connect();
	}

	async _connect() {
		if (!this.instance) {
			try {
				this.instance = await mongoose.connect(this.url, { dbName: 'shoppik' });
				systemLog.info('- Connected to MongoDB.');
			} catch (e) {
				this.instance = undefined;
				this._close();
				systemLog.error('Connect to MongoDB fail');
				throw e;
			}
		}
		return this.instance;
	}

	_close() {
		return this.instance?.disconnect();
	}
}

const db = new MongoDb({});

export default db;

// const fastifyMongoose = async (fastify: FastifyInstance, options: any, next: Function) => {
//     mongoose.set('strictQuery', false);

//     const uri = options.uri;
//     if (!uri) {
//         next(new Error('`uri` parameter is mandatory'));
//         return;
//     }
//     delete options.uri;

//     try {
//         await connect(uri, { ...options });

//         systemLog.info('- Connected to MongoDB.');

//         next();
//     } catch (err) {
//         await mongoose.disconnect();
//         await mongoose.connection.close();
//         fastify.log.error(err, 'Error connecting to MongoDB');
//         next(err);
//     }
// };

// export default fp(fastifyMongoose, {
//     fastify: '>=4.13.0',
//     name: 'fastify-mongoose',
// });
