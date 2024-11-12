import { getAllStocks, getStockQuote } from "@/app/utility/finnhub"
import { NextRequest } from "next/server"

export const dynamic = 'force-static'

export async function GET(req: Request) {

    const stocks = await getAllStocks();

    return new Response(JSON.stringify(stocks));
}