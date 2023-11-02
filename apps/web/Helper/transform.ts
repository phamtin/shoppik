import { AttributePattern } from '@shoppik/types';

const transformToAttributePattern = (
	input: Array<Record<keyof AttributePattern, any>> | undefined,
): AttributePattern[] => {
	if (!input) return [];

	const res: AttributePattern[] = [];

	for (let i = 0; i < input.length; i++) {
		const element = input[i];
		if (!element.k) continue;

		res.push({
			k: element.k,
			v: typeof element.v === 'string' ? element.v : JSON.stringify(element.v),
		});
	}

	return res;
};

export default transformToAttributePattern;
