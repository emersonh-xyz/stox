'use client';

import { Stock } from "@/app/utility/widgets";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useState, useEffect } from "react";
import { GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from 'framer-motion'; // Import Framer Motion

export type CompanyNews = {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
};

export default function CompanyNews({ data }: { data: Stock[] }) {

    const [stock, setStock] = useState<Stock>();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [news, setNews] = useState<CompanyNews[]>();
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (news && news.length > 0) {
                setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [news]);

    function SearchBar() {
        return (
            <input
                key={'search'}
                type="text"
                autoFocus={true}
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    e.preventDefault();
                }}
                className="input input-bordered w-full max-w-xs"
            />
        );
    }

    const filteredStocks = data?.filter(stock =>
        stock.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to 5 stocks

    async function handleSelectStock(stock: Stock) {
        setStock(stock);
        const newsData = await fetchStockNews(stock);
        setNews(newsData);
        setCurrentNewsIndex(0);
    }

    async function fetchStockNews(stock: Stock) {
        const data = await fetch('/api/finnhub/company-news', {
            method: 'POST',
            body: JSON.stringify({
                symbol: stock.symbol,
                from: '2024-10-01',
                to: '2024-11-13'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return data.json();
    }

    function SettingsMenu() {
        return (
            <div className="absolute flex gap-4 flex-col mt-8 left-72 transform -translate-x-full min-w-96 py-4 bg-base-200 px-4 rounded-2xl drop-shadow-2xl border-primary border-1 z-10">
                <h1 className=" text-lg">Configure your News source</h1>
                <SearchBar />
                {isLoading ? <span className="loading loading-lg"></span> : (
                    <div>
                        {filteredStocks?.map((s: Stock) => (
                            <div
                                onClick={() => {
                                    handleSelectStock(s);
                                }}
                                key={s.symbol}
                                className={`flex items-center gap-2 p-2 border-b border-base-100 hover:cursor-pointer hover:border-primary ${s.symbol === stock?.symbol ? 'underline text-primary' : ''}`}
                            >
                                {s.symbol}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 ">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-2xl">Company News</h1>
                    <div className="flex items-center justify-between"></div>
                </div>
                <div className="relative">
                    <GearIcon
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="w-6 h-6 hover:cursor-pointer"
                    />
                    {isSettingsOpen && <SettingsMenu />}
                </div>
            </div>
            <Card className="bg-base-300 border-none rounded-md">
                <CardHeader>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            {stock &&
                                <Avatar>
                                    <AvatarImage src={`https://assets.parqet.com/logos/symbol/${stock?.symbol}`} />
                                    <AvatarFallback className="bg-base-100">{stock?.symbol}{stock?.symbol[stock?.symbol.length - 1]}</AvatarFallback>
                                </Avatar>
                            }
                            <div className="flex flex-col max-w-xs overflow-hidden">
                                <h1 className="font-bold text-xl truncate overflow-hidden text-ellipsis">{stock ? stock.description : 'No Stock Selected'}</h1>
                                <h2 className="text-xs text-base-content truncate overflow-hidden text-ellipsis">{stock ? stock.symbol : 'Select a stock to view news'}</h2>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {news && news.length > 0 &&
                        <motion.div
                            key={currentNewsIndex} // A unique key ensures each new news item is animated separately
                            initial={{ opacity: 0, y: 20 }} // Animation starts with opacity 0 and slight translation
                            animate={{ opacity: 1, y: 0 }} // Animates to visible and no translation
                            exit={{ opacity: 0, y: -20 }} // Exit animation goes back to opacity 0 and upward translation
                            transition={{ duration: 0.5 }} // Transition time for the animations
                            className="flex flex-col gap-2 animate-in justify-between py-2"
                        >
                            <div className="">
                                <img className="object-cover rounded-md" src={news[currentNewsIndex].image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpZaeWxczipxrTdSIThz5hmwrRYhEeeAl5A&s'} alt={news[currentNewsIndex].headline} />
                                <h1 className="font-bold text-md truncate">{news[currentNewsIndex].headline}</h1>
                                <div>
                                    <a href={news[currentNewsIndex].url} target="_blank" rel="noreferrer" className="text-primary">Read more</a>
                                </div>
                            </div>
                        </motion.div>
                    }
                </CardContent>
            </Card>
        </div>
    );
}
