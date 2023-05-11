import qs from 'qs';
import { ParsedQs } from 'qs';

export interface QueryParams {
	page?: number;
	q?: string | string[] | ParsedQs | ParsedQs[] | null;
	sort?: string | string[] | ParsedQs | ParsedQs[] | null;
	direction?: string | string[] | ParsedQs | ParsedQs[] | null;
	role?: string | string[] | null | undefined;
	user?: string | string[] | null | undefined;
}

interface ParsedQsParams {
	[key: string]: undefined | string | string[] | null;
}

export function getQueryParams(path: string) {
	return qs.parse(path, { ignoreQueryPrefix: true }) as ParsedQsParams;
}
export function setQueryParams(params: QueryParams) {
	return qs.stringify(params, { arrayFormat: 'brackets' });
}
