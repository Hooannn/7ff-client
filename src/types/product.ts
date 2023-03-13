import { IUser } from './auth';
import { ICategory } from './category';

export interface IProduct {
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
