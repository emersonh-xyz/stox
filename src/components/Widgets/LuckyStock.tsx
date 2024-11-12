'use client';

import { fetchStockQuote, Stock } from "@/app/utility/widgets";
import { Dice1, Dice2, Dice4 } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function LuckyStock({ data }: { data: Stock[] }) {

    const [rolling, setRolling] = useState(false);
    const [rollingText, setRollingText] = useState('');

    const [stock, setStock] = useState<Stock>();

    console.log()

    const roll = async () => {
        setStock(undefined);
        setRolling(true);
        changeText();
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % data.length;
        const randomStock = data[randomIndex];

        const interval = changeText();
        setTimeout(async () => {
            const quote = await fetchStockQuote(randomStock.symbol);
            setStock({ ...randomStock, quote });
            setRolling(false);
            clearInterval(interval);
        }, 5000);
    }

    // function that changes the text of the rollingText state every 100ms
    const changeText = () => {
        const texts = [
            'Apple',
            'Microsoft',
            'Tesla',
            'Amazon',
            'Google',
            'Facebook',
            'Netflix',
            'Twitter',

        ];
        let i = 0;
        const interval = setInterval(() => {
            setRollingText(texts[i]);
            i++;
            if (i === texts.length) {
                i = 0;
            }
        }, 300);
        return interval;
    }

    return (
        <div className="flex flex-col gap-4 animate-in w-full">
            <h1 className="font-bold text-2xl">Lucky Stock</h1>
            <div className="flex flex-col gap-2 bg-base-300 rounded-full p-4 w-full ">
                {!rolling && !stock &&
                    < div className="flex flex-col gap-2 px-4 items-center text-center">
                        <Dice4 onClick={roll} className="w-8 h-8 hover:cursor-pointer" />
                        <div className="flex flex-col">
                            <h1 className="text-sm">Click the die to roll a lucky stock!</h1>
                        </div>
                    </div>
                }

                {rolling && !stock &&
                    <div className="flex flex-col gap-2 px-4 py-2 items-center text-center">
                        <Dice4 className="w-12 h-12 hover:cursor-pointer animate-spin" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-xl">{rollingText}</h1>
                            <h2 className="animate-pulse text-xs w-full">Determining your future investments... </h2>
                        </div>
                    </div>
                }

                {stock && !rolling &&
                    <div className="flex flex-col gap-2 px-4 items-center text-center">
                        <Avatar>
                            <AvatarImage src={`https://assets.parqet.com/logos/symbol/${stock.symbol}`} />
                            <AvatarFallback className="bg-base-100">{stock.symbol[0]}{stock.symbol[stock.symbol.length - 1]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-center">
                            <h1 className="font-bold text-sm break-words">Your lucky stock is <br /><a target="_blank" href={`https://robinhood.com/us/en/stocks/${stock.symbol}`} className="text-primary text-xs animate-in underline">{stock.description}</a>!</h1>
                            <h1 className="text-xs">Evaluated at <span className="font-bold text-success">${stock.quote.c}</span> a share</h1>
                        </div>

                        <div className="flex flex-col gap-1">

                            <a target="_blank" href={`https://robinhood.com/us/en/stocks/${stock.symbol}`}>
                                <button className="btn rounded-full btn-accent btn-xs mt-2">
                                    View on Robinhood
                                </button>
                            </a>

                            <button onClick={roll} className="btn rounded-full btn-secondary btn-xs mt-2">
                                Roll again
                            </button>

                        </div>

                        {/* <button onClick={roll} className="btn btn-primary btn-xs text-white rounded">Reroll</button> */}
                    </div>
                }

            </div>
        </div >
    )
}