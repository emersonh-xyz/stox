import { getStockQuote } from "@/app/utility/finnhub"
import { headers } from 'next/headers'

export const dynamic = 'force-static'

export async function GET() {
    const headersList = await headers();
    const symbol = headersList.get('symbol');

    console.log(headersList)

    if (!symbol) {
        return Response.json({ status: 400, body: 'Missing symbol header' })
    }

    const quote = await getStockQuote(symbol)
    return Response.json({ quote })
}