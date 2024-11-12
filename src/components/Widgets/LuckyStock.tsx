'use client';

import { Dice1, Dice2, Dice4 } from "lucide-react";
import { useState } from "react";

export default function LuckyStock({ stocks }: { stocks: any }) {

    const [rolling, setRolling] = useState(false);
    const [rollingText, setRollingText] = useState('');

    const stocksData = [
        {
            'name': 'Apple',
            'symbol': 'AAPL',
            'image': 'https://images.vexels.com/content/129234/preview/apple-logo-icon-bf9728.png'
        },
        {
            'name': 'Twitter',
            'symbol': 'TWTR',
            'image': 'https://download.logo.wine/logo/Twitter/Twitter-Logo.wine.png'
        },
    ]

    const [stock, setStock] = useState<any>(null);

    console.log()

    const roll = () => {
        setRolling(true);
        changeText();
        const randomStock = stocksData[Math.floor(Math.random() * stocksData.length)];

        setTimeout(() => {
            setStock(randomStock);
            setRolling(false);
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
        <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-2 bg-base-300 rounded-full p-4 ">

                {!rolling && !stock &&
                    < div className="flex items-center gap-4">
                        <Dice4 onClick={roll} className="w-8 h-8 hover:cursor-pointer" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-xl">Lucky Stock</h1>
                            <h1 className="text-sm">Click the die to roll a lucky stock!</h1>
                        </div>
                    </div>
                }

                {rolling && !stock &&
                    <div className="flex items-center gap-4">
                        <Dice4 className="w-8 h-8 hover:cursor-pointer animate-spin" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-xl">{rollingText}</h1>
                        </div>
                    </div>
                }

                {stock && !rolling &&
                    <div className="flex items-center gap-1">
                        <img src={stock.image} className="w-18 h-12 hover:cursor-pointer" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-md text-nowrap">Your lucky stock is <span className="text-primary">{stock.name}</span>!</h1>
                            <h1 className="text-sm">Evaluated at <span className="text-success">$3.90</span> a share</h1>
                        </div>
                    </div>
                }

            </div>
        </div >
    )
}