import camelCase from 'lodash.camelcase';
import escape from 'lodash.escape';
import get from 'lodash.get';

export type ObjectType = {
	[key: string]: unknown;
};
export const isArray = (d: any) => Array.isArray(d);
export const isObject = (d: any) =>
	d === Object(d) && !isArray(d) && typeof d !== 'function';

export const sanitizeParams = (d: any, filter?: boolean) => {
	if (isObject(d)) {
		const o: any = {};
		Object.keys(d).forEach((k) => {
			o[camelCase(k)] = sanitizeParams(d[k], true);
		});
		return o;
	}

	if (isArray(d)) {
		return d.map((o: any) => sanitizeParams(o, true));
	}

	if (filter && d === '') {
		return null;
	}

	if (typeof d === 'string') {
		return escape(d);
	}
	return d;
};

export const toCamelCase = (d: any, filter?: boolean) => {
	if (isObject(d)) {
		const o: any = {};
		Object.keys(d).forEach((k) => {
			o[camelCase(k)] = toCamelCase(d[k], true);
		});
		return o;
	}
	if (isArray(d)) {
		return d.map((o: any) => toCamelCase(o, true));
	}

	if (filter && d === '') {
		return null;
	}

	return d;
};

export function trimValue<T extends unknown>(d: T): T | ObjectType {
	if (typeof d === 'string') {
		return d.trim() as T;
	}

	if (isObject(d)) {
		const o: ObjectType = {};
		Object.keys(d as Record<string, unknown>).forEach((k) => {
			o[k] = trimValue(get(d, k) as T);
		});

		return o;
	}

	if (isArray(d)) {
		return (d as Array<unknown>).map((i: unknown) => trimValue(i)) as T;
	}

	return d;
}

interface Omit {
	<T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
		[K2 in Exclude<keyof T, K[number]>]: T[K2];
	};
}

export const omit: Omit = (obj, ...keys) => {
	const ret = {} as {
		[K in keyof typeof obj]: (typeof obj)[K];
	};
	let key: keyof typeof obj;
	for (key in obj) {
		if (!keys.includes(key)) {
			ret[key] = obj[key];
		}
	}
	return ret;
};
