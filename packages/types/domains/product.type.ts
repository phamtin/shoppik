import { AttributePattern } from "./common.type";
import { StoreTag } from "./store.type";

export type ProductRating = {
  score: number;
  reviews: number;
  sold: number;
};

export type ProductSchema = {
  _id?: string;
  storeId: string;
  name: string;
  slug: string;
  description?: string;
  keyFeatures: string[];
  images: string[];
  originPrice: number;
  quantity: number;
  rating: ProductRating;
  storeCategories: StoreTag[];
  shoppikCategories: string[];
  variants: AttributePattern[];
  detail: AttributePattern[];
  lastSavedAt: Date;
  isDraft: boolean;
  isDeleted?: boolean;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
};
