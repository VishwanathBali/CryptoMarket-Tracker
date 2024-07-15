import { connectToDB } from "@/utils/database";
import StockPrice from "@/models/stock";


export const POST = async (req: Request) => {
    const { name, price } = await req.json();

    try {
        await connectToDB();
        
        const existingStock = await StockPrice.findOne({ name });

        if (existingStock) {
            if (existingStock.prices.length >= 20) {
                existingStock.prices.shift();
              }
              existingStock.prices.push({ price, timestamp: new Date() });
          
              await existingStock.save();

            return new Response(JSON.stringify(existingStock), { status: 200 });
        } else {
            const newStockPrice = new StockPrice({
                name,
                prices: [{ price, timestamp: new Date() }]
            });

            await newStockPrice.save();

            return new Response(JSON.stringify(newStockPrice), { status: 201 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Failed to create or update stock price entry", { status: 500 });
    }
}
