import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','email','fullname','firstname','lastname','phoneNumber','birthday','locale','avatar','postalCode','isConfirm','signinMethod','createdAt','updatedAt','isDeleted','deletedAt']);

export const StoreScalarFieldEnumSchema = z.enum(['id','name','slug','tradeName','description','avatar','landingPageUrl','ownerId','followers','following','storeStatus','createdAt','updatedAt','isDeleted','DeletedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

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
  fullname: z.string().min(4, { message: "min error" }).max(32, { message: "max error" }),
  firstname: z.string().min(2, { message: "min error" }).max(32, { message: "max error" }),
  lastname: z.string().min(2, { message: "min error" }).max(32, { message: "max error" }),
  phoneNumber: z.string().max(16, { message: "max error" }),
  birthday: z.string().max(32, { message: "max error" }),
  locale: z.string().max(2, { message: "max error" }),
  avatar: z.string().max(512, { message: "max error" }),
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
  name: z.string(),
  slug: z.string(),
  tradeName: z.string(),
  description: z.string(),
  avatar: z.string(),
  landingPageUrl: z.string(),
  ownerId: z.string(),
  followers: z.string().array(),
  following: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  isDeleted: z.boolean(),
  DeletedAt: z.date().nullable(),
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
// MONGODB TYPES
/////////////////////////////////////////
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
  phone: z.string(),
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
