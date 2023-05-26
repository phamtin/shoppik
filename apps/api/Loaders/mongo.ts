import mongoose, { Mongoose, MongooseOptions } from 'mongoose';

import systemLog from '../Pkgs/systemLog';

class MongoDb {
	instance: Mongoose | undefined = undefined;
	options: MongooseOptions;
	url: string = '';

	constructor(options: MongooseOptions) {
		this.options = options || {};
		this.url = 'mongodb://mongodb:27017';
		// this.url = 'mongodb://localhost:27017';
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

const db = () => new MongoDb({});

export default db;
