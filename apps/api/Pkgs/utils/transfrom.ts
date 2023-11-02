import { FieldMask } from 'Pkgs/types/common.type';

export function sanitize<T>(obj: T): T {
	for (const propName in obj) {
		if (typeof obj[propName] === 'undefined') {
			delete obj[propName];
		} else if (typeof obj[propName] === 'object') {
			sanitize(obj[propName]);
		}
	}

	return obj;
}
