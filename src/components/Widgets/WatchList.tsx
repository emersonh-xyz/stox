'use client';

import { getStockQuote } from "@/app/utility/finnhub";
import { GearIcon } from "@radix-ui/react-icons";
import { Timer } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { watchListDefaults } from "@/app/config/defaults";
import { fetchStockQuote, Stock } from "@/app/utility/widgets";

export default function WatchList({ data }: { data: Stock[] | undefined }) {

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
    const [refreshTimer, setRefreshTimer] = useState(30);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const refreshQuotes = async () => {
        const updatedStocks = await Promise.all(selectedStocks.map(async stock => {
            const quote = await fetchStockQuote(stock.symbol);
            return { ...stock, quote };
        }));
        setSelectedStocks(updatedStocks);
        setRefreshTimer(30);
    };

    const handleSelectStock = async (stock: Stock) => {
        if (selectedStocks.some(s => s.symbol === stock.symbol)) {
            setSelectedStocks(selectedStocks.filter(s => s.symbol !== stock.symbol));
        } else if (selectedStocks.length < 5) {
            const quote = await fetchStockQuote(stock.symbol);
            setSelectedStocks([...selectedStocks, { ...stock, quote }]);
        }
    };


    const filteredStocks = data?.filter(stock =>
        stock.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to 5 stocks

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            refreshQuotes();
        }, 30000);

        if (selectedStocks.length >= 1) {
            localStorage.setItem('watchList', JSON.stringify(selectedStocks));
        }
        // refreshQuotes();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [selectedStocks]);

    useEffect(() => {
        const watchList = localStorage.getItem('watchList');
        if (watchList && watchList.length >= 1) {
            console.log(watchList.length)
            setSelectedStocks(JSON.parse(watchList));
        } else {
            setSelectedStocks(watchListDefaults);
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setRefreshTimer(prev => prev > 0 ? prev - 1 : 30);
        }, 1000);

        return () => clearInterval(timer);

    }, []);


    function SettingsMenu() {
        return (
            <div className="absolute flex gap-4 flex-col mt-8 left-72 transform -translate-x-full min-w-96 py-4 bg-base-200 px-4 rounded-2xl drop-shadow-2xl border-primary border-1 z-10">
                <h1 className=" text-lg">Configure your Watch List</h1>
                <SearchBar />
                <div>
                    {filteredStocks?.map(stock => (
                        <div
                            onClick={() => handleSelectStock(stock)}
                            key={stock.symbol}
                            className={`flex items-center gap-2 p-2 border-b border-base-100 hover:cursor-pointer hover:border-primary ${selectedStocks.some(s => s.symbol === stock.symbol) ? 'underline text-primary' : ''}`}
                        >
                            {/* <img src={stock.icon} alt={stock.symbol} className="w-6 h-6" /> */}
                            <span>{stock.symbol} ({stock.description})</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-2xl">Watch List</h1>
                    <div className="flex items-center justify-between">
                        {/* <button onClick={refreshQuotes} className="btn btn-primary">Refresh Now</button> */}
                        <span className="text-xs flex items-center gap-1"> <Timer className="w-3 h-3" /> Next refresh in: {refreshTimer}s</span>
                    </div>
                </div>
                <div className="relative">
                    <GearIcon
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="w-6 h-6 hover:cursor-pointer"
                    />

                    {isSettingsOpen && <SettingsMenu />}
                </div>
            </div>



            <div className="flex flex-col gap-2">
                {selectedStocks.map((stock) => {
                    const percentChange = ((stock.quote?.c - stock.quote?.pc) / stock.quote?.pc) * 100;
                    return (
                        <div key={stock.symbol} className="flex flex-row items-center justify-between p-2 gap-4 bg-base-300 rounded-full w-full max-w-[300px] hover:scale-110">
                            <div className="flex gap-2 items-center px-4 w-1/2">
                                {/* <img src={`https://assets.parqet.com/logos/symbol/${stock.symbol}`} alt={stock.symbol} className="h-8 w-8" /> */}
                                <Avatar>
                                    <AvatarImage src={`https://assets.parqet.com/logos/symbol/${stock.symbol}`} />
                                    <AvatarFallback>{stock.symbol[0]}{stock.symbol[stock.symbol.length - 1]}</AvatarFallback>
                                </Avatar>
                                <div className="truncate">
                                    <h2 className="truncate">{stock.symbol}</h2>
                                    <p className="text-xs truncate">{stock.description}</p>
                                </div>
                            </div>

                            <div className="px-4 w-1/2 text-right">
                                <div className="flex items-center gap-1 text-md justify-end">
                                    <h2 className="truncate drop-shadow-md">${stock.quote?.c?.toLocaleString()}</h2>
                                </div>
                                <div className="flex items-center justify-end gap-2 text-xs">
                                    <p className={percentChange >= 0 ? 'text-primary drop-shadow-md' : 'text-secondary drop-shadow-md'}>
                                        {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}