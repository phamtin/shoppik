import { ReactNode } from 'react';

export interface Option {
	value?: string | number | null;
	label: ReactNode;
	children?: Option[];
	isLeaf?: boolean;
}
