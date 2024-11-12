'use client';

import WatchList from "@/components/Widgets/WatchList";
import WidgetAdder from "@/components/WidgetAdder";
import { useEffect, useState } from "react";
import { getWidgets } from "../utility/widgets";
import LuckyStock from "@/components/Widgets/LuckyStock";
import BigGraph from "@/components/Widgets/BigGraph";
import MarketStatus from "@/components/Widgets/MarketStatus";

export default function Dashboard({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const [stocksData, setStocksData] = useState();
    const [widgets, setWidgets] = useState([]);

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


    useEffect(() => {
        fetchStocksData();
        loadWidgets();

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
                    <h1 className="text-2xl">Getting your stonks ready...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between ">
            <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-3 ">
                {widgets[0] && <WatchList data={stocksData} />}
                {widgets[1] && <LuckyStock data={stocksData} />}
                {widgets[2] && <BigGraph />}
                {widgets[3] && <MarketStatus />}

            </div>
            <div className="px-24">
                <WidgetAdder />
            </div>
        </div>
    )
}