import { IUser } from './auth';
import { ICategory } from './category';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  yearlyTotalSales: number;
  yearlyTotalSoldUnits: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  category: string | ICategory;
  isAvailable: boolean;
  rating: number;
  views?: string[] | IUser[];
  viewsCount?: number;
  featuredImages?: string[];
}

export interface IDetailedItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}
