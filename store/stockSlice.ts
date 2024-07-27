import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockPrice {
  price: number;
  timestamp: string;
}

interface StockState {
  name: string;
  prices: StockPrice[];
}

const getInitialState = (): StockState[] => {
  const stockNames = ['BTC', 'SOL', 'BNB', 'DOGE', 'ETH'];
  return stockNames.map(name => {
    const storedPrices = localStorage.getItem(name);
    let prices: StockPrice[] = [];
    if (storedPrices) {
      try {
        console.log(storedPrices)
        prices = JSON.parse(storedPrices);
      } catch (error) {
        console.error(`Error parsing prices for ${name} from localStorage`, error);
      }
    }
    return {
      name,
      prices
    };
  });
};

const initialState: StockState[] = getInitialState();

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStockPrices: (state, action: PayloadAction<{ name: string; prices: StockPrice[] }>) => {
      const { name, prices } = action.payload;
      console.log("Set stock price called ",name," ",prices)
      const stock = state.find(stock => stock.name === name);
      if (stock) {
        stock.prices = prices;
      }
    },
    updateStockPrice: (state, action: PayloadAction<{ name: string; price: StockPrice }>) => {
      const { name, price } = action.payload;
      const stock = state.find(stock => stock.name === name);
      if (stock) {
        stock.prices.push(price);
        if (stock.prices.length > 20) {
          stock.prices.shift();
        }
      }
    },
  },
});

export const { setStockPrices,updateStockPrice } = stockSlice.actions;

export default stockSlice;
