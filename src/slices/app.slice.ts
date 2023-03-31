import { createSlice } from '@reduxjs/toolkit';
type ITheme = 'light' | 'dark';
type IActiveTab = 'home' | 'menu' | 'about us' | 'booking table' | null;
interface IProductItem {
  productId: string;
  quantity: number;
}
export interface AppState {
  theme: ITheme;
  activeTab: IActiveTab;
  cartItems: IProductItem[];
}

const initialState: AppState = {
  theme: 'dark',
  activeTab: 'home',
  cartItems: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setActiveTab: (state, { payload }: { payload: IActiveTab }) => {
      state.activeTab = payload;
    },
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

export const { setTheme, setActiveTab, addToCart, decreaseCartItem, removeCartItem, resetCart } = appSlice.actions;

export default appSlice.reducer;
