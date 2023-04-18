import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IDetailedItem } from '../types';
import { RootState } from '../@core/store';

// Fake data
const products = [
  {
    _id: 'hgh0001',
    name: 'Chicken burger',
    price: 30000,
    featuredImages: ['/food-images/burger-01.png'],
    isAvailable: true,
  },
  {
    _id: 'hgh0002',
    name: 'Fish burger',
    price: 35000,
    featuredImages: ['/food-images/burger-02.png'],
    isAvailable: true,
  },
  {
    _id: 'hgh0003',
    name: 'Beef burger',
    price: 40000,
    featuredImages: ['/food-images/burger-03.png'],
    isAvailable: true,
  },
];

interface ICartItem {
  productId: string;
  quantity: number;
}

interface ICartValues {
  detailedItems: IDetailedItem[];
  totalPrice: number;
  shippingFee: number;
}

const MINIMUM_VALUE_FOR_FREE_SHIPPING = 300000;
const DEFAULT_SHIPPING_FEE = 20000;
const INITIAL_CART_VALUES = {
  detailedItems: [],
  totalPrice: 0,
  shippingFee: 0,
};

const useCart = () => {
  //   const { products } = useProducts();
  const cartItems = useSelector((state: RootState) => state.app.cartItems);

  const cartValues = useMemo(() => {
    return cartItems.reduce((acc: ICartValues, item: ICartItem) => {
      const itemInfo = products.find(product => product._id === item.productId);

      if (itemInfo && itemInfo.isAvailable) {
        const newTotalPrice = acc.totalPrice + itemInfo.price * item.quantity;
        const detailedItem = {
          ...item,
          name: itemInfo.name,
          price: itemInfo.price,
          image: itemInfo.featuredImages[0],
        };

        return {
          detailedItems: [...acc.detailedItems, detailedItem],
          totalPrice: newTotalPrice,
          shippingFee: newTotalPrice >= MINIMUM_VALUE_FOR_FREE_SHIPPING ? 0 : DEFAULT_SHIPPING_FEE,
        };
      } else {
        return acc;
      }
    }, INITIAL_CART_VALUES);
  }, [cartItems, products]);

  return { ...cartValues, MINIMUM_VALUE_FOR_FREE_SHIPPING };
};

export default useCart;
