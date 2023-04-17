import { createSlice } from '@reduxjs/toolkit';
interface IProductItem {
  productId: string;
  quantity: number;
}
export interface AppState {
  cartItems: IProductItem[];
}

const initialState: AppState = {
  cartItems: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToCart: (state, { payload }: { payload: string }) => {
      const foundItem = state.cartItems.find(item => item.productId === payload);
      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        state.cartItems.push({
          productId: payload,
          quantity: 1,
        });
      }
    },
    decreaseCartItem: (state, { payload }: { payload: string }) => {
      const foundItem = state.cartItems.find(item => item.productId === payload);
      if (foundItem && foundItem?.quantity > 1) {
        foundItem.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(item => item.productId !== payload);
      }
    },
    removeCartItem: (state, { payload }: { payload: string }) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== payload);
    },
    resetCart: state => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, decreaseCartItem, removeCartItem, resetCart } = appSlice.actions;

export default appSlice.reducer;
