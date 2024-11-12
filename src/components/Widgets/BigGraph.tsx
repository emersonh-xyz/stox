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

export default function BigGraph() {

    const [stock, setStock] = useState<Stock>();

    const sampleStock: Stock = {
        symbol: 'AAPL',
        description: 'Apple Inc.',
    }


    useEffect(() => {
        handleUpdateStock(sampleStock);
    }, [])

    const handleUpdateStock = async (stock: Stock) => {
        const quote = await fetchStockQuote(stock.symbol);
        setStock({ ...stock, quote });
    };

    const chartData = [
        { month: "", price: stock?.quote.l },
        { month: "", price: stock?.quote.h },
    ]
    const chartConfig = {
        desktop: {
            label: "Price",
            color: "hsl(var(--chart-1))",

        },
    } satisfies ChartConfig

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-2xl">Graph View</h1>
                    </div>
                    <Card className="bg-base-300 border-none rounded-md">
                        <CardHeader>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1 items-center">
                                    <h1 className="font-bold text-2xl">{stock ? stock.description : 'No Stock Selected'}</h1>
                                    <h2>{stock ? stock.symbol : ''} </h2>
                                </div>
                                <p>${stock?.quote.c}</p>
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
                                {stock?.quote.dp > 0 ? (
                                    <>
                                        Trending up by<span className="text-primary ">%{stock?.quote.dp}</span> today <TrendingUp className="h-4 w-4" />
                                    </>
                                ) : stock?.quote.dp < 0 ? (
                                    <>
                                        Trending down by<span className="text-accent ">%{stock?.quote.dp}</span> today <TrendingUp className="h-4 w-4 transform rotate-180" />
                                    </>
                                ) : <p>No change in trend at this moment</p>}
                            </div>
                            <div className="leading-none text-muted-foreground">
                                {/* Showing total visitors for the last 6 months */}
                            </div>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </div>
    )
}