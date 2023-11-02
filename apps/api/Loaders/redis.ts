import { Redis, RedisOptions } from 'ioredis';

import systemLog from '../Pkgs/systemLog';

class RedisCache {
	instance: Redis | undefined = undefined;
	options: RedisOptions & { prefix?: string };

	constructor(options: RedisOptions) {
		this.options = options || {};
		const keepAlive = options.keepAlive || true;

		if (keepAlive) {
			this._connect();
		}
	}

	async _connect() {
		const { prefix, db } = this.options;
		if (!this.instance) {
			try {
				this.instance = new Redis({
					host: process.env.REDIS_HOST as never,
					port: process.env.REDIS_PORT as never,
					password: process.env.REDIS_PASSWORD as never,
				});
				// this.instance = new Redis({
				// 	host: process.env.REDIS_HOST,
				// 	port: 6379,
				// });
				await this.instance.set('PING', 'PONG');
				systemLog.info('- Connected WTF to Redis.');
			} catch (e) {
				systemLog.error('Connect to Redis fail');
				this.instance = undefined;
				this._close();
				throw e;
			}
		}

		return this.instance;
	}

	_expire(key: string, ttl: number) {
		return new Promise(
			(resolve, reject) =>
				this.instance
					?.expire(key, ttl)
					.then((r) => resolve(r))
					.catch((e) => reject(e)),
		);
	}

	_pipeline() {
		return this.instance?.pipeline();
	}

	_set(key: string, value: string | number, ttl?: number) {
		return new Promise(
			(resolve, reject) =>
				this.instance
					?.set(key, value)
					.then(() => {
						if (ttl) this._expire(key, ttl);
						resolve(true);
					})
					.catch((e) => {
						reject(e);
					}),
		);
	}

	setHashMap(key: string, data: object | Map<string | number, string | number>) {
		return new Promise((resolve, reject) => {
			if (data === undefined || data === null) {
				this.instance?.del(key);
				return resolve(true);
			}
			this.instance?.hmset(key, data, (err) => {
				if (err) return reject(err);
				return resolve(true);
			});
		});
	}

	_deleteKey(key: string | string[]) {
		if (typeof key === 'string') {
			return new Promise(() => this.instance?.del(key));
		}
		return new Promise(() => this.instance?.del(key));
	}

	_get(key: string) {
		return new Promise(
			(resolve, reject) =>
				this.instance
					?.get(key)
					.then((r) => resolve(r))
					.catch((e) => reject(e)),
		);
	}

	_close() {
		return this.instance?.disconnect();
	}
}

const redis = new RedisCache({
	keepAlive: 1,
	db: 1,
});

export default redis;
