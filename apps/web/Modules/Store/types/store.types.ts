import { ShoppikCategory } from '@shoppik/types';

export interface ShoppikCategoryResponse extends Omit<ShoppikCategory, 'parentId'> {
	parentId?: string;
}
