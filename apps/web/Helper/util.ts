import typia from 'typia';

export const typiaStringify = <T>(input: T): string => {
	return typia.stringify<T>(input);
};
