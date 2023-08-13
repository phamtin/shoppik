import { ShoppikCategory } from '@shoppik/schema';

export interface ShoppikCategoryResponse extends Omit<ShoppikCategory, 'parentId'> {
	parentId?: string;
}
