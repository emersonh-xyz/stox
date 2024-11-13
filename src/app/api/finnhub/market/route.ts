import { getAllStocks, getMarketStatus, getStockQuote } from "@/app/utility/finnhub"
import { NextRequest } from "next/server"

export const dynamic = 'force-static'

export async function GET(req: Request) {

    const status = await getMarketStatus();
    return new Response(JSON.stringify(status))
}