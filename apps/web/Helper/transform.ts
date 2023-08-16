import { AttributePattern } from '@shoppik/schema';
import typia from 'typia';
import { typiaStringify } from './util';

export const transformToAttributePattern = (
	input: Array<Record<keyof AttributePattern, any>> | undefined,
): AttributePattern[] => {
	if (!input) return [];

	const res: AttributePattern[] = [{ k: '', v: '', u: null }];

	for (let i = 0; i < input.length; i++) {
		const element = input[i];
		if (!element.k) continue;

		res.push({
			k: element.k,
			v: typeof element.v === 'string' ? element.v : typiaStringify(element.v),
			u: element.u
				? typeof element.u === 'string'
					? element.u
					: typiaStringify(element.u)
				: null,
		});
	}

	return res;
};
