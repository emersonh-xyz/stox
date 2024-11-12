'use client';

import { getStockQuote } from "@/app/utility/finnhub";
import { GearIcon } from "@radix-ui/react-icons";
import { useState, useCallback } from "react";

type Stock = {
    currency: string,
    description: string,
    displaySymbol: string,
    figi: string,
    symbol: string,
    type: string,
}

export default function WatchList({ stocks }: { stocks: Stock[] }) {

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);

    const handleSelectStock = (stock: Stock) => {
        if (selectedStocks.some(s => s.symbol === stock.symbol)) {
            setSelectedStocks(selectedStocks.filter(s => s.symbol !== stock.symbol));
        } else if (selectedStocks.length < 5) {
            setSelectedStocks([...selectedStocks, stock]);
        }
    };

    const fetchStockQuote = async (symbol: string) => {
        await fetch('/api/finnhub/quote', {
            method: 'GET',
            headers: {
                'symbol': symbol
            }
        }).then(res => res.json())
            .then(data => {
                return data;
            })
    }

    const filteredStocks = stocks.filter(stock =>
        stock.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to 5 stocks

    function SettingsMenu() {
        return (
            <div className="absolute flex gap-4 flex-col mt-8 left-72 transform -translate-x-full min-w-96 py-4 bg-base-200 px-4 rounded-2xl drop-shadow-2xl border-primary border-1">
                <h1 className=" text-lg">Configure your Watch List</h1>
                <SearchBar />
                <div>
                    {filteredStocks.map(stock => (
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
                <h1 className="font-bold text-2xl">Watch List</h1>
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
                    return (
                        <div key={stock.symbol} className="flex flex-row items-center justify-between p-2 gap-4 bg-base-300 rounded-full w-[300px] hover:scale-110">
                            <div className="flex gap-2 items-center px-4 ">
                                {/* <img src={stock.icon} alt={stock.name} className="h-8 w-8" /> */}
                                <div>
                                    <h2>{stock.symbol}</h2>
                                    <p className="text-xs">{stock.description}</p>
                                </div>
                            </div>
                            {/* <div className="px-4">
                            <h2>${stock.price.toLocaleString()}</h2>
                            <p className="text-success">{stock.change}</p>
                        </div> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}