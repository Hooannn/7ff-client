import { IUser } from './auth';
import { ICategory, IContent } from './category';

export interface IProduct {
  _id?: string;
  name: IContent;
  description: IContent;
  price: number;
  stocks?: number;
  yearlyTotalSales?: number;
  yearlyTotalSoldUnits?: number;
  monthlyData?: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  category: string | ICategory;
  isAvailable: boolean;
  rating?: number;
  views?: string[] | IUser[];
  viewsCount?: number;
  featuredImages?: string[];
}

export interface IDetailedItem {
  product: IProduct;
  quantity: number;
}

export interface IVoucher {
  _id: string;
  code: string;
  discountType: 'percent' | 'amount';
  discountAmount: number;
  expiredDate?: string;
}
