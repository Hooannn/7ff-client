export interface IOrder {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  totalPrice: number;
  discount?: number;
  note?: string;
  isDelivery: boolean;
  deliveryAddress?: string;
  deliveryPhone?: string;
  status: string;
}
