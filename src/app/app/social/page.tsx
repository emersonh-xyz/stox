'use client';

import { getLocaleLanguage } from '@/app/utility/language';
import { Stock } from '@/app/utility/widgets';
import SocialFeed from '@/components/Widgets/SocialFeed';
import { Search, ThumbsUp } from "lucide-react";
import { useEffect, useState } from 'react';

export type SocialData = {
    avatar: string;
    name: string;
    description: string;
    likes: number;
    dislikes: number;
}

export default function SocialPage() {

    const [stocksData, setStocksData] = useState<Stock[]>([]);

    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const fetchStocksData = async () => {
            const res = await fetch(`/api/internal/stocks`, {
                method: 'GET',
            });
            const data = await res.json();
            setStocksData(data);
        }

        setLanguage(getLocaleLanguage());

        fetchStocksData();
    }, [])

    return (
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
            <SocialFeed data={stocksData} lang={language} />
        </div>
    );
}