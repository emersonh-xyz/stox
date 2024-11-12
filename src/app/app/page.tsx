'use client';

import WatchList from "@/components/Widgets/WatchList";
import { getAllStocks } from "../utility/finnhub";
import WidgetAdder from "@/components/WidgetAdder";
import { useEffect, useState } from "react";
import { watchListDefaults } from "../config/defaults";
import { getWidgets } from "../utility/widgets";

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
            <div className="flex items-center justify-center h-screen absolute inset-0">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    return (
        <div className="flex justify-between ">
            <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3 ">

                {widgets[0] && <WatchList data={stocksData} />}

            </div>
            <div className="px-24">
                <WidgetAdder />
            </div>
        </div>
    )
}