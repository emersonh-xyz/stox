'use client';

import SocialFeed from '@/components/Widgets/SocialFeed';
import { Search, ThumbsUp } from "lucide-react";
import { useState } from 'react';

export type SocialData = {
    avatar: string;
    name: string;
    description: string;
    likes: number;
    dislikes: number;
}

export default function SocialPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const data = [
        {
            name: 'Finn',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKEPj39dt2MkDcFLaBuFUzINx_FulSTqypzA&s',
            description: 'Bro tesla is the future',
            likes: 10,
            dislikes: 2
        },
        {
            name: 'Jake',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVPivcBfs-9wTbacocOQ5sh_8gPa44tsyS0w&s',
            description: 'I am a dog',
            likes: 20,
            dislikes: 5
        },
        {
            name: 'BMO',
            avatar: 'https://i.redd.it/6j6vqnpia9hc1.jpeg',
            description: 'VIDEO GAMES',
            likes: 15,
            dislikes: 1
        },

    ]

    const filteredData = data.filter((social) =>
        social.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        social.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex border-2 border-red-500 justify-between w-full p-20 items-center  gap-44">

            {/* <div className="flex flex-col">
                <div className="flex justify-left mt-45 mb-20">
                    <h1 className="text-4xl font-bold">Follow</h1>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Communities</h1>
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-48 md:w-64" />
                    </div>
                </div>

                <div className="card bg-white shadow-lg rounded-lg p-2 mt-2">
                    <h2 className="text-xl font-bold mb-2">UserA</h2>
                    {<p className="text-gray-700">90k members </p>}
                    <div className="absolute top-2 right-4">
                        <button className="ml-auto btn btn-primary text-white bg-yellow-500 hover:bg-blue-700 px-6 py-2 rounded">
                            Join
                        </button>
                    </div>
                </div>
                <div className="card bg-white shadow-lg rounded-lg p-2 mt-4">
                    <h2 className="text-xl font-bold mb-2">DaUser8</h2>
                    {<p className="text-gray-700">900k members </p>}
                    <div className="absolute top-2 right-4">
                        <button className="ml-auto btn btn-primary text-white bg-yellow-500 hover:bg-blue-700 px-6 py-2 rounded">
                            Join
                        </button>
                    </div>
                </div>
                <div className="card #a1a1aa shadow-lg rounded-lg p-2 mt-4">
                    <h2 className="text-xl font-bold mb-2">ImWiNnInG</h2>
                    {<p className="text-gray-700">20k members </p>}
                    <div className="absolute top-2 right-4">
                        <button className="ml-auto btn btn-primary text-white bg-yellow-500 hover:bg-blue-700 px-6 py-2 rounded">
                            Join
                        </button>
                    </div>
                </div>
                <div className="card bg-white shadow-lg rounded-lg p-2 mt-4">
                    <h2 className="text-xl font-bold mb-2">WhozBaD</h2>
                    {<p className="text-gray-700">30k members </p>}
                    <div className="absolute top-2 right-4">
                        <button className="ml-auto btn btn-primary text-white bg-yellow-500 hover:bg-blue-700 px-6 py-2 rounded">
                            Join
                        </button>
                    </div>
                </div>
            </div> */}

            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl">Communties</h1>

                <div className=" bg-base-300 flex flex-col gap-2 rounded-3xl">
                    {data.map((social) => (
                        <div>
                            <div key={social.name} className="flex flex-row items-center justify-between p-4 gap-4">
                                <div className="flex gap-2 items-center px-4 ">
                                    <img src={social.avatar} alt={social.name} className="h-12 w-12 rounded-full" />
                                    <div>
                                        <h2 className="font-bold">{social.name}</h2>
                                        <p className="text-xs">{social.description}</p>
                                    </div>
                                </div>
                                {/* <div className="px-4">
                                    <div className="flex gap-2 items-center">
                                        <ThumbsUp className="w-4 hover:scale-105 hover:cursor-pointer" />
                                        <span className="text-success">{social.likes}</span>
                                        <span className="text-error">{social.dislikes}</span>
                                    </div>
                                </div> */}
                                {/* Search bar */}
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="input input-bordered w-32 md:w-48 rounded-full px-4 py-1"
                                    />
                                    <Search className="absolute right-2 text-gray-500" />
                                </div>

                            </div>
                            <div className="border-b-2 border-base-100 w-full"></div>
                        </div>
                    ))}

                </div>

            </div >

            <SocialFeed />
        </div>
    );
}