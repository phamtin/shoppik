import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const RoleScalarFieldEnumSchema = z.enum(['id','name','permission','createdAt','updatedAt']);

export const CustomerScalarFieldEnumSchema = z.enum(['id','userId','createdAt','updatedAt']);

export const OwnerScalarFieldEnumSchema = z.enum(['id','userId','storeId','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['id','roleId','email','firstname','lastname','fullname','phoneNumber','birthday','locale','avatar','postalCode','isConfirm','signinMethod','createdAt','updatedAt','isDeleted','deletedAt']);

export const StoreScalarFieldEnumSchema = z.enum(['id','name','slug','tradeName','description','avatar','landingPageUrl','ownerId','followers','following','storeStatus','createdAt','updatedAt','isDeleted','DeletedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const RolesSchema = z.enum(['ADMIN','CUSTOMER','OWNER']);

export type RolesType = `${z.infer<typeof RolesSchema>}`

export const SigninMethodSchema = z.enum(['GOOGLE','TELEGRAM']);

export type SigninMethodType = `${z.infer<typeof SigninMethodSchema>}`

export const StoreStatusSchema = z.enum(['ACTIVE','INACTIVE','CLOSED','DELETED']);

export type StoreStatusType = `${z.infer<typeof StoreStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  name: RolesSchema,
  id: z.string(),
  permission: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
})

export type Role = z.infer<typeof RoleSchema>

/////////////////////////////////////////
// CUSTOMER SCHEMA
/////////////////////////////////////////

export const CustomerSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
})

export type Customer = z.infer<typeof CustomerSchema>

/////////////////////////////////////////
// OWNER SCHEMA
/////////////////////////////////////////

export const OwnerSchema = z.object({
  id: z.string(),
  userId: z.string(),
  storeId: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
})

export type Owner = z.infer<typeof OwnerSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  signinMethod: SigninMethodSchema,
  id: z.string(),
  roleId: z.string().array(),
  email: z.string(),
  firstname: z.string().min(1, { message: "min error" }).max(50, { message: "max error" }),
  lastname: z.string().min(1, { message: "min error" }).max(50, { message: "max error" }),
  fullname: z.string().min(4, { message: "min error" }).max(50, { message: "max error" }),
  phoneNumber: z.string().min(9, { message: "min error" }).max(10, { message: "max error" }),
  birthday: z.string(),
  locale: z.string(),
  avatar: z.string(),
  postalCode: z.string(),
  isConfirm: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date({ invalid_type_error: "wrong date type" }).nullable(),
  isDeleted: z.boolean().nullable(),
  deletedAt: z.date().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

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

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////
// SESSION
//------------------------------------------------------


/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  signinMethod: SigninMethodSchema,
  accessToken: z.string(),
  iat: z.number().int(),
  exp: z.number().int(),
  sub: z.string(),
  scope: z.string(),
})

export type Session = z.infer<typeof SessionSchema>
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
  phone: z.string().array(),
  youtubeLink: z.string(),
  facebookLink: z.string(),
  instagramLink: z.string(),
})

export type Contact = z.infer<typeof ContactSchema>
