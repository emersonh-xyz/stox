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
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchStocksData = async () => {
            const res = await fetch(`/api/internal/stocks`, {
                method: 'GET',
            });
            const data = await res.json();
            setStocksData(data);
        }

        const fetchUsers = async () => {
            const res = await fetch(`/api/internal/social/users`, {
                method: 'GET',
            });
            const data = await res.json();
            console.log(data);
            setUsers(data.data);
        }

        setLanguage(getLocaleLanguage());
        fetchUsers();

        fetchStocksData();
    }, [])

    return (
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
            <SocialFeed data={stocksData} lang={language} />
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Site Users</h1>

                <div className="flex flex-col bg-base-300 rounded-3xl p-4 gap-4">

                    {users?.map((user, i) => {
                        return (
                            <div className="flex gap-2" key={i}>
                                <img src={user.imageUrl} className="w-8 h-8 rounded-full" />
                                <div className="flex flex-col">
                                    {user.firstName}
                                    <span className="text-accent">@{user.username}</span>
                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>
        </div>
    );
}