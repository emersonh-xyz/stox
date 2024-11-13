'use client';

import { fetchStockQuote, Stock } from "@/app/utility/widgets";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function BigGraph({ data }: { data: Stock[] }) {

    const [stock, setStock] = useState<Stock>();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

    function SettingsMenu() {
        return (
            <div className="absolute flex gap-4 flex-col mt-8 left-72 transform -translate-x-full min-w-96 py-4 bg-base-200 px-4 rounded-2xl drop-shadow-2xl border-primary border-1 z-10">
                <h1 className=" text-lg">Configure your Graph</h1>
                <SearchBar />
                {isLoading ? <span className="loading loading-lg"></span>
                    :
                    <div>
                        {filteredStocks?.map(s => (
                            <div
                                onClick={() => {
                                    handleSelectStock(s)
                                }}
                                key={s.symbol}
                                className={`flex items-center gap-2 p-2 border-b border-base-100 hover:cursor-pointer hover:border-primary ${s.symbol === stock?.symbol ? 'underline text-primary' : ''}`}
                            >
                                {/* <img src={stock.icon} alt={stock.symbol} className="w-6 h-6" /> */}
                                <span>{s.symbol} ({s.description})</span>
                            </div>
                        ))}
                    </div>
                }
            </div>
        );
    }

    const handleSelectStock = async (stock: Stock) => {
        setIsLoading(true);
        const quote = await fetchStockQuote(stock.symbol)

        setIsLoading(false)
        setStock({ ...stock, quote });
    };

    const chartData = [
        { month: "low", price: stock?.quote?.l },
        { month: "high", price: stock?.quote?.h },
    ]
    const chartConfig = {
        desktop: {
            label: "Price",
            color: "hsl(var(--chart-1))",

        },
    } satisfies ChartConfig

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-2xl">Graph View</h1>
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
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-xl truncate max-w-xs" style={{ maxWidth: '200px' }}>{stock ? stock.description : 'No Stock Selected'}</h1>
                                        <h2>{stock ? stock.symbol : ''} </h2>
                                    </div>
                                </div>
                                <p>${stock?.quote?.c}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <LineChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={0}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Line
                                        dataKey="price"
                                        type="bumpX"
                                        stroke="oklch(var(--p))"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-1 font-medium leading-none">
                                {stock?.quote?.dp > 0 ? (
                                    <>
                                        Up by<span className="text-primary ">{stock?.quote?.dp}%</span> today <TrendingUp className="h-4 w-4" />
                                    </>
                                ) : stock?.quote?.dp < 0 ? (
                                    <>
                                        Down by<span className="text-primary ">{stock?.quote?.dp}%</span> today <TrendingUp className="h-4 w-4 transform rotate-180" />
                                    </>
                                ) : <p>No change in trend at this moment</p>}
                            </div>
                            <div className="leading-none text-muted-foreground">
                                {/* Showing total visitors for the last 6 months */}
                            </div>
                        </CardFooter>
                    </Card>

                </div>
                <div className="relative">
                    <GearIcon
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="w-6 h-6 hover:cursor-pointer"
                    />

                    {isSettingsOpen && <SettingsMenu />}
                </div>
            </div>
        </div>
    )
}