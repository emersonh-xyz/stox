'use client';

import WatchList from "@/components/Widgets/WatchList";
import WidgetAdder from "@/components/WidgetAdder";
import { useEffect, useState } from "react";
import { getWidgets } from "../utility/widgets";
import LuckyStock from "@/components/Widgets/LuckyStock";
import BigGraph from "@/components/Widgets/BigGraph";
import MarketStatus from "@/components/Widgets/MarketStatus";
import CompanyNews from "@/components/Widgets/CompanyNews";
import SocialFeed from "@/components/Widgets/SocialFeed";
import { getLocaleLanguage } from "../utility/language";
import { useSearchParams } from "next/navigation";

export default function Dashboard({
    params,
}: {
    params: Promise<{ slug: string }>

}) {

    const [stocksData, setStocksData] = useState();
    const [widgets, setWidgets] = useState([]);
    const [language, setLanguage] = useState('en');
    const searchParams = useSearchParams()

    const [openWidget, setOpenWidget] = useState(false);

    const fetchStocksData = async () => {
        const res = await fetch(`/api/internal/stocks`, {
            method: 'GET',
        });
        const data = await res.json();
        setStocksData(data);
    }

    const loadWidgets = async () => {
        const toggledWidgets = await getWidgets();
        setWidgets(toggledWidgets);
    }

    const onboarding = searchParams.get('onboarding')

    useEffect(() => {
        fetchStocksData();
        loadWidgets();

        setLanguage(getLocaleLanguage());

        if (onboarding === '2') {
            setOpenWidget(true);
        }

    }, [])

    useEffect(() => {

        const handleStorageChange = () => {
            loadWidgets();
        };

        window.addEventListener('widgetToggled', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    useEffect(() => {
        console.log('widgets updated!')
    }, [widgets])

    if (!stocksData) {
        return (
            <div className="flex items-center flex-col justify-center h-screen absolute inset-0 text-center">
                <div>
                    <span className="loading loading-ball text-primary loading-lg"></span>
                    <h1 className="text-2xl">
                        {language === 'en' ? 'Getting your stonks ready...' : 'Préparez vos pierres..'}
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between ">
            <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-3 px-2 custom-scrollbar">
                {widgets[0] && <WatchList lang={language} data={stocksData} />}
                {widgets[2] && <BigGraph lang={language} data={stocksData} />}
                {widgets[5] && <SocialFeed lang={language} data={stocksData} />}
                {widgets[4] && <CompanyNews lang={language} data={stocksData} />}
                {widgets[3] && <MarketStatus lang={language} />}
                {widgets[1] && <LuckyStock lang={language} data={stocksData} />}
            </div>
            <div className="px-24 absolute right-0">
                <WidgetAdder openWidget={openWidget} />
            </div>
        </div>
    )
}