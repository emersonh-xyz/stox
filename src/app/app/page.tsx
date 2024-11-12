import WatchList from "@/components/Widgets/WatchList";
import { getAllStocks } from "../utility/finnhub";

export default async function Dashboard({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const stocks = await getAllStocks();

    return (
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3 ">
            <WatchList stocks={stocks} />
        </div>
    )
}