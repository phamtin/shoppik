export enum SigninMethod {
  GOOGLE = "GOOGLE",
  TELEGRAM = "TELEGRAM",
}

export type Customer = {
  trustscore: number;
  updatedAt?: Date;
};

export type Owner = {
  storeId: string;
};

export type AccountSchema = {
  _id: string;
  email: string;
  fullname: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  birthday: string;
  locale: string;
  avatar: string;
  postalCode: string;
  signinMethod: SigninMethod;
  isConfirm: boolean;
  roleCustomer: Customer;
  roleOwner?: Owner;
  isDeleted?: boolean;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt: Date;
};
