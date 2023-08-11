import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','email','fullname','firstname','lastname','phoneNumber','birthday','locale','avatar','postalCode','isConfirm','signinMethod','createdAt','updatedAt','isDeleted','deletedAt']);

export const StoreScalarFieldEnumSchema = z.enum(['id','name','slug','tradeName','description','avatar','landingPageUrl','ownerId','followers','following','storeStatus','isDeleted','DeletedAt','createdAt','updatedAt']);

export const ShoppikCategoryScalarFieldEnumSchema = z.enum(['id','name','isSubCategory','parentId']);

export const ProductScalarFieldEnumSchema = z.enum(['id','storeId','name','slug','description','keyFeatures','images','originPrice','quantity','shoppikCategories','isDraft','createdAt','lastSavedAt','isDeleted','DeletedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortSchema = z.enum(['ASC','DESC']);

export type SortType = `${z.infer<typeof SortSchema>}`

export const SigninMethodSchema = z.enum(['GOOGLE','TELEGRAM']);

export type SigninMethodType = `${z.infer<typeof SigninMethodSchema>}`

export const StoreStatusSchema = z.enum(['ACTIVE','INACTIVE','CLOSED','DELETED']);

export type StoreStatusType = `${z.infer<typeof StoreStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  signinMethod: SigninMethodSchema,
  id: z.string(),
  email: z.string(),
  fullname: z.string().min(4, { message: "min error" }).max(128, { message: "max error" }),
  firstname: z.string().min(2, { message: "min error" }).max(64, { message: "max error" }),
  lastname: z.string().min(2, { message: "min error" }).max(64, { message: "max error" }),
  phoneNumber: z.string().max(16, { message: "max error" }),
  birthday: z.string().max(32, { message: "max error" }),
  locale: z.string().max(2, { message: "max error" }),
  avatar: z.string().max(1024, { message: "max error" }),
  postalCode: z.string().max(16, { message: "max error" }),
  isConfirm: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  isDeleted: z.boolean().nullable(),
  deletedAt: z.date().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  roleCustomer: Customer;
  roleOwner?: Owner | null;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  roleCustomer: z.lazy(() => CustomerSchema),
  roleOwner: z.lazy(() => OwnerSchema).nullable(),
}))

/////////////////////////////////////////
// STORE SCHEMA
/////////////////////////////////////////

export const StoreSchema = z.object({
  storeStatus: StoreStatusSchema,
  id: z.string(),
  name: z.string().min(2, { message: "min error" }).max(1024, { message: "max error" }),
  slug: z.string(),
  tradeName: z.string().max(1024, { message: "max error" }),
  description: z.string().max(4096, { message: "max error" }),
  avatar: z.string().max(4096, { message: "max error" }),
  landingPageUrl: z.string().max(4096, { message: "max error" }),
  ownerId: z.string(),
  followers: z.string().array(),
  following: z.string().array(),
  isDeleted: z.boolean(),
  DeletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
})

export type Store = z.infer<typeof StoreSchema>

// STORE RELATION SCHEMA
//------------------------------------------------------

export type StoreRelations = {
  storeAddress: StoreAddress;
  tags: StoreTag[];
  rating: StoreRating;
  contact: Contact;
};

export type StoreWithRelations = z.infer<typeof StoreSchema> & StoreRelations

export const StoreWithRelationsSchema: z.ZodType<StoreWithRelations> = StoreSchema.merge(z.object({
  storeAddress: z.lazy(() => StoreAddressSchema),
  tags: z.lazy(() => StoreTagSchema).array(),
  rating: z.lazy(() => StoreRatingSchema),
  contact: z.lazy(() => ContactSchema),
}))

/////////////////////////////////////////
// SHOPPIK CATEGORY SCHEMA
/////////////////////////////////////////

export const ShoppikCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  isSubCategory: z.boolean(),
  parentId: z.string().array(),
})

export type ShoppikCategory = z.infer<typeof ShoppikCategorySchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.string(),
  storeId: z.string(),
  name: z.string().min(2, { message: "min error" }).max(512, { message: "max error" }),
  slug: z.string(),
  description: z.string(),
  keyFeatures: z.string().array(),
  images: z.string().array(),
  originPrice: z.number().lt(1, { message: "Invalid" }).gt(999999999, { message: "Invalid" }),
  quantity: z.number().lt(1, { message: "Invalid" }).gt(999999999, { message: "Invalid" }),
  shoppikCategories: z.string().array(),
  isDraft: z.boolean(),
  createdAt: z.date(),
  lastSavedAt: z.date(),
  isDeleted: z.boolean(),
  DeletedAt: z.date().nullable(),
})

export type Product = z.infer<typeof ProductSchema>

// PRODUCT RELATION SCHEMA
//------------------------------------------------------

export type ProductRelations = {
  rating: ProductRating;
  storeCategories: StoreTag[];
  variants: AttributePattern[];
  detail: AttributePattern[];
};

export type ProductWithRelations = z.infer<typeof ProductSchema> & ProductRelations

export const ProductWithRelationsSchema: z.ZodType<ProductWithRelations> = ProductSchema.merge(z.object({
  rating: z.lazy(() => ProductRatingSchema),
  storeCategories: z.lazy(() => StoreTagSchema).array(),
  variants: z.lazy(() => AttributePatternSchema).array(),
  detail: z.lazy(() => AttributePatternSchema).array(),
}))

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////
// PAGINATION
//------------------------------------------------------


/////////////////////////////////////////
// PAGINATION SCHEMA
/////////////////////////////////////////

export const PaginationSchema = z.object({
  sort: SortSchema,
  page: z.number().int(),
  pageSize: z.number().int(),
  sortBy: z.string(),
})

export type Pagination = z.infer<typeof PaginationSchema>
// CUSTOMER
//------------------------------------------------------


/////////////////////////////////////////
// CUSTOMER SCHEMA
/////////////////////////////////////////

export const CustomerSchema = z.object({
  trustscore: z.number().int(),
  updatedAt: z.date().nullable(),
})

export type Customer = z.infer<typeof CustomerSchema>
// OWNER
//------------------------------------------------------


/////////////////////////////////////////
// OWNER SCHEMA
/////////////////////////////////////////

export const OwnerSchema = z.object({
  storeId: z.string(),
})

export type Owner = z.infer<typeof OwnerSchema>
// STORE TAG
//------------------------------------------------------


/////////////////////////////////////////
// STORE TAG SCHEMA
/////////////////////////////////////////

export const StoreTagSchema = z.object({
  name: z.string(),
  slug: z.string(),
})

export type StoreTag = z.infer<typeof StoreTagSchema>
// STORE RATING
//------------------------------------------------------


/////////////////////////////////////////
// STORE RATING SCHEMA
/////////////////////////////////////////

export const StoreRatingSchema = z.object({
  score: z.number().int(),
  reviews: z.number().int(),
  responseTime: z.number().int(),
})

export type StoreRating = z.infer<typeof StoreRatingSchema>
// CONTACT
//------------------------------------------------------


/////////////////////////////////////////
// CONTACT SCHEMA
/////////////////////////////////////////

export const ContactSchema = z.object({
  email: z.string(),
  phone: z.string().array(),
  youtubeLink: z.string().nullable(),
  facebookLink: z.string().nullable(),
  instagramLink: z.string().nullable(),
})

export type Contact = z.infer<typeof ContactSchema>
// STORE ADDRESS
//------------------------------------------------------


/////////////////////////////////////////
// STORE ADDRESS SCHEMA
/////////////////////////////////////////

export const StoreAddressSchema = z.object({
  province: z.string(),
  district: z.string(),
  ward: z.string(),
  street: z.string(),
  note: z.string().nullable(),
})

export type StoreAddress = z.infer<typeof StoreAddressSchema>
// ATTRIBUTE PATTERN
//------------------------------------------------------


/////////////////////////////////////////
// ATTRIBUTE PATTERN SCHEMA
/////////////////////////////////////////

export const AttributePatternSchema = z.object({
  k: z.string(),
  v: z.string(),
  u: z.string(),
})

export type AttributePattern = z.infer<typeof AttributePatternSchema>
// PRODUCT RATING
//------------------------------------------------------


/////////////////////////////////////////
// PRODUCT RATING SCHEMA
/////////////////////////////////////////

export const ProductRatingSchema = z.object({
  score: z.number().lt(1, { message: "Invalid" }).gt(5, { message: "Invalid" }),
  reviews: z.number().lt(0, { message: "Invalid" }),
  sold: z.number().lt(0, { message: "Invalid" }),
})

export type ProductRating = z.infer<typeof ProductRatingSchema>
