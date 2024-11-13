import { getCompanyNews, getStockQuote } from "@/app/utility/finnhub"

export const dynamic = 'force-static'

export async function POST(req: Request) {

    const { symbol, to, from } = await req.json()

    console.log(symbol, to, from)

    if (!symbol || !to || !from) {
        return new Response('Missing required data', {
            status
                : 400
        });
    }

    const news = await getCompanyNews(from, to, symbol);

    return new Response(JSON.stringify(news));

}