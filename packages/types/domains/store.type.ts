export type StoreTag = {
  _id: string;
  name: string;
  slug: string;
};

export type StoreRating = {
  score: number;
  reviews: number;
  responseTime: number;
};

export type Contact = {
  email: string;
  phone: string[];
  youtubeLink?: string;
  facebookLink?: string;
  instagramLink?: string;
};

export enum StoreStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CLOSED = "CLOSED",
  DELETED = "DELETED",
}

export type StoreAddress = {
  province: string;
  district: string;
  ward: string;
  street: string;
  note: string;
};

export type StoreSchema = {
  _id?: string;
  name: string;
  slug: string;
  tradeName: string;
  description: string;
  storeAddress: StoreAddress;
  avatar: string;
  ownerId: string;
  landingPageUrl: string;
  followers: string[];
  following: string[];
  rating: StoreRating;
  tags: StoreTag[];
  contact: Contact;
  storeStatus: StoreStatus;
  isDeleted?: boolean;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt: Date;
};
