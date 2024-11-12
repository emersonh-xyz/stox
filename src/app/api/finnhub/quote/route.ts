import { getStockQuote } from "@/app/utility/finnhub"
import { headers } from "next/headers";
import { NextRequest } from "next/server"

export const dynamic = 'force-static'

export async function POST(req: Request) {

    const { symbol } = await req.json()
    console.log(symbol)

    if (!symbol) {
        return new Response('Symbol is required', {
            status
                : 400
        });
    }

    const quote = await getStockQuote(symbol);

    return new Response(JSON.stringify(quote));

}