import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  cryptoOrder: string[];
  currentIndex: number;
}

const initialState: NavigationState = {
  cryptoOrder: ['/', '/DOGE', '/ETH', '/SOL', '/BNB'],
  currentIndex: 0,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCryptoOrder: (state, action: PayloadAction<string[]>) => {
      state.cryptoOrder = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    updateCurrentIndex: (state, action: PayloadAction<string>) => {
      const index = state.cryptoOrder.indexOf(action.payload);
      if (index !== -1) {
        state.currentIndex = index;
      }
    },
  },
});

export const { setCryptoOrder, setCurrentIndex, updateCurrentIndex } = navigationSlice.actions;

export default navigationSlice;
