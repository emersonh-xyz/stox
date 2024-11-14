'use client';

import { Stock } from "@/app/utility/widgets";
import { TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Status = {
    exchange: string;
    holiday: boolean;
    isOpen: boolean;
    timeZone: string;
    t: number;
}

export default function MarketStatus({ lang }: { lang: string }) {

    const [status, setStatus] = useState<Status>();


    useEffect(() => {
        const fetchMarketStatus = async () => {
            const res = await fetch(`/api/finnhub/market`, {
                method: 'GET',
            });
            const data = await res.json();
            setStatus(data);
        }

        fetchMarketStatus();
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">
                {lang === 'fr' ? 'État du marché' : 'Market Status'}
            </h1>
            <div className="bg-base-300 p-4 rounded-3xl">
                <div className="flex flex-col gap-1">
                    {/* <label>Market Status</label> */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-primary font-bold">
                            {status?.isOpen ? lang === 'fr' ? 'Ouvert' : 'Open' : lang === 'fr' ? 'Fermé' : 'Closed'}
                        </span>

                        <span className="text-primary font-bold flex items-center gap-1"><TimerIcon className="w-5" /> {status ? new Date(status.t * 1000).toLocaleTimeString() : ''} EST</span>
                        {/* <span className="text-primary">Time: {status?.time}</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}