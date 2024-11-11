import SocialFeed from "@/components/Widgets/SocialFeed";
import WatchList from "@/components/Widgets/WatchList";
import WeeeklyNFT from "@/components/Widgets/WeeklyNFT";
import { getAllStocks } from "../utility/finnhub";
import LuckyStock from "@/components/Widgets/LuckyStock";

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