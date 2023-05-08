import { IOrder } from './order';

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  refreshToken?: string;
  avatar?: string;
  orders?: string[] | IOrder[];
  cartItems?: {
    productId: string[];
    quantity: number;
  }[];
  role: IRole;
  createdAt?: string;
}

type IRole = 'User' | 'Admin' | 'SuperAdmin';
