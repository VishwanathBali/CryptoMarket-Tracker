import { connectToDB } from "@/utils/database";
import StockPrice from "@/models/stock";
import { Request } from "express";

export const GET = async (request: Request, { params }: { params: { name: string } }) => {
    try {
        await connectToDB();
  
        const stock = await StockPrice.findOne({ name: params.name });
  
        if (!stock) return new Response("Stock not found", { status: 404 });
  
        return new Response(JSON.stringify(stock), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch stock price", { status: 500 });
    }
};
