import SocialFeed from "@/components/Widgets/SocialFeed";
import WatchList from "@/components/Widgets/WatchList";
import WeeeklyNFT from "@/components/Widgets/WeeklyNFT";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3 ">
            <WatchList />
            <SocialFeed />
            <WeeeklyNFT />

        </div>
    )
}