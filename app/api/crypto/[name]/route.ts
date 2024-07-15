import { connectToDB } from "@/utils/database";
import StockPrice from "@/models/stock";
import { Request } from "express";

export const GET = async (request: Request, { params }: { params: { name: string } }) => {
    try {
        await connectToDB();
  
        // Find stock by name instead of ID
        const stock = await StockPrice.findOne({ name: params.name });
  
        if (!stock) return new Response("Stock not found", { status: 404 });
  
        return new Response(JSON.stringify(stock), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch stock price", { status: 500 });
    }
};


// export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
//   const { price } = await request.json();

//   try {
//     await connectToDB();

//     const existingStock = await StockPrice.findById(params.id);

//     if (!existingStock) return new Response("Stock not found", { status: 404 });

//     if (existingStock.prices.length >= 10) {
//       existingStock.prices.shift();
//     }
//     existingStock.prices.push({ price, timestamp: new Date() });

//     await existingStock.save();

//     return new Response(JSON.stringify(existingStock), { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to update stock price", { status: 500 });
//   }
// };
