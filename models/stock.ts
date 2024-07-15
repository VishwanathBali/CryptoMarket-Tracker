import { Schema,model,models,Document } from "mongoose";

interface IPriceEntry {
    price: number;
    timestamp: Date;
}

interface IStockPrice extends Document {
    name: string;
    prices: IPriceEntry[];
}

function arrayLimit(val: IPriceEntry[]): boolean {
    return val.length <= 20;
}

const PriceSchema = new Schema<IPriceEntry>({
    price: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
});

const StockPriceSchema = new Schema<IStockPrice>({
    name: { 
      type: String, 
      required: true,
    },
    prices: {
      type: [PriceSchema],
      validate: [arrayLimit, 'Prices array exceeds the limit of 20'],
    },
});

const StockPrice = models.StockPrice || model<IStockPrice>('StockPrice', StockPriceSchema);

export default StockPrice

