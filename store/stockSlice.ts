import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockPrice {
  price: number;
  timestamp: string;
}

interface StockState {
  name: string;
  prices: StockPrice[];
}

const initialState: StockState = {
  name: '',
  prices: [],
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStockName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setStockPrices: (state, action: PayloadAction<StockPrice[]>) => {
      state.prices = action.payload; // Directly assign the payload
    },
  },
});

export const { setStockName, setStockPrices } = stockSlice.actions;

export default stockSlice;
