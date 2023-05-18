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
					host: 'redis',
					port: 6379,
				});
				await this.instance.set('PING', 'PONG');
				systemLog.info('- Connected WTF to Redis.');
			} catch (e) {
				this.instance = undefined;
				this._close();
				systemLog.error('Connect to Redis fail');
				throw e;
			}
		}

		return this.instance;
	}

	_expire(key: string, ttl: number) {
		return new Promise((resolve, reject) =>
			this.instance
				?.expire(key, ttl)
				.then((r) => resolve(r))
				.catch((e) => reject(e)),
		);
	}

	_pipeline() {
		return this.instance?.pipeline();
	}

	_set(key: string, value: any, ttl?: number) {
		return new Promise((resolve, reject) =>
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

	_deleteKey(key: string) {
		return new Promise(() => this.instance?.set(key, ''));
	}

	_get(key: string) {
		return new Promise((resolve, reject) =>
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
