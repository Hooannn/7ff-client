import { createSlice } from '@reduxjs/toolkit';
type ITheme = 'light' | 'dark';
type IActiveTab = 'home' | 'menu' | 'about us' | 'booking table';
export interface AppState {
  theme: ITheme;
  activeTab: IActiveTab;
}

const initialState: AppState = {
  theme: 'dark',
  activeTab: 'home',
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
  },
});

export const { setTheme, setActiveTab } = appSlice.actions;

export default appSlice.reducer;
