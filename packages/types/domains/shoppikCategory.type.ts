export type ShoppikCategory = {
  _id?: string;
  name: string;
  isSubCategory: boolean;
  parentId: string | null;
};
