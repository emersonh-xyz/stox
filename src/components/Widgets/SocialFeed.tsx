'use client';

import { useEffect, useState } from "react";
import { useAuth, useUser } from '@clerk/nextjs'
import { Stock } from "@/app/utility/widgets";
import EmojiPicker from 'emoji-picker-react';
import { SmileIcon } from "lucide-react";
import { Post, Reply } from "@prisma/client";
import { get } from "http";

type PostExtended = Post & {
    Replies: Reply[];
}


export default function SocialFeed({ data, lang }: { data: Stock[], lang: string }) {

    const [postBody, setPostBody] = useState<string>('');
    const [posts, setPosts] = useState<PostExtended[]>([]);
    const [stock, setStock] = useState<Stock>();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const { isLoaded, isSignedIn, user } = useUser()

    const togglEmojiPicker = (value: boolean) => {
        setIsEmojiPickerOpen(value);
    }

    const likePost = async (postId: string) => {
        const data = await fetch('/api/internal/social/post/like', {
            method: 'POST',
            body: JSON.stringify({
                postId: postId,
            }),
        })

        await getAllPosts();
    }

    const getAllPosts = async () => {
        setIsLoading(true);
        const data = await fetch('/api/internal/social/post', {
            method: 'GET',
        })

        const posts = await data.json();

        setPosts(posts.reverse());
        setIsLoading(false);
    }

    const createPost = async () => {

        if (postBody.length < 1 || !postBody) {
            alert('Please type something before posting');
        }

        const data = await fetch('/api/internal/social/post', {
            method: 'POST',
            body: JSON.stringify({
                body: postBody, avatarUrl: user?.imageUrl, authorName: user?.fullName, authorId: user?.id, symbol: stock?.symbol
            }),
        })

        const post = await data.json();

        setPosts([...posts, post]);
        setPostBody('');
    }

    const filteredStocks = data?.filter(stock =>
        stock.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to 5 stocks

    function handleSelectStock(stock: Stock) {
        setStock(stock);
        setIsSettingsOpen(false);
    }

    useEffect(() => {
        getAllPosts();
    }, [])

    function SettingsMenu() {
        return (
            <div className="absolute flex gap-4 flex-col mt-8 left-72 transform -translate-x-full min-w-96 py-4 bg-base-200 px-4  drop-shadow-2xl border-primary border-1 z-30">
                <h1 className=" text-lg">
                    {lang === 'en' ? 'Configure your News source' : 'Configurez votre source de nouvelles'}
                </h1>
                <SearchBar />
                {isLoading ? <span className="loading loading-lg"></span> :
                    <div>
                        {filteredStocks?.map(s => (
                            <div
                                onClick={() => handleSelectStock(s)}
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

    function SearchBar() {
        return (
            <input
                key={'search'}
                type="text"
                autoFocus={true}
                placeholder={lang === 'en' ? "Search stocks..." : "Rechercher des actions..."}
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
        <div className="flex flex-col gap-4 w-96 ">
            <h1 className="font-bold text-2xl">
                {lang === 'en' ? 'Social Feed' : 'Flux social'}
            </h1>

            <div className="bg-base-300 flex flex-col gap-2 rounded-3xl">
                <div className="p-4 gap-4 flex flex-col">
                    <div className="flex flex-col">
                        <label>
                            {lang === 'en' ? 'Create a post' : 'Créer un post'}
                        </label>
                        {postBody.length > 1 && !stock && <label className="text-sm text-warning">
                            {lang === 'en' ? 'Please select a stock' : 'Veuillez sélectionner une action'}
                        </label>}
                    </div>
                    <div className=" items-center relative">
                        <input
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                            className="bg-base-100 p-2 rounded-lg pr-10 w-full"
                            placeholder={lang === 'en' ? 'What are you thinking?' : 'À quoi penses-tu?'}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <SmileIcon onClick={() => {
                                togglEmojiPicker(!isEmojiPickerOpen)
                            }} />
                        </div>
                    </div>
                    <div className="relative">
                        {isEmojiPickerOpen && <EmojiPicker onEmojiClick={(emojiObject) => {
                            setPostBody(postBody + emojiObject.emoji)
                        }} />}
                    </div>
                    <div className="flex gap-2 items-start">


                        {postBody.length > 0 && stock ?
                            <button onClick={createPost} className="btn-primary btn btn-sm">
                                {lang === 'en' ? 'Create Post' : 'Créer un post'}
                            </button>
                            :
                            <button className="btn btn-sm btn-disabled">
                                {lang === 'en' ? 'Create Post' : 'Créer un post'}
                            </button>
                        }


                        <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className=" btn-accent btn btn-sm">
                            {!stock ?
                                lang === 'en' ? 'Select a stock' : 'Sélectionnez une action'
                                : `$${stock.symbol}`}
                        </button>
                        <div className="relative">
                            {isSettingsOpen && <SettingsMenu />}
                        </div>

                    </div>
                </div>

                {isLoading ? <span className="loading loading-infinity loading-sm text-primary flex items-center justify-center mx-auto p-20"></span> :
                    <div className="flex flex-col gap-1 bg-base-200 rounded-lg overflow-auto h-64">

                        {posts.map((post, i) => (
                            <div key={i} className="bg-base-200 flex gap-4 border-b-2 border-base-100 px-4 py-2 items-center rounded-b-lg">
                                <img src={post.avatarUrl} alt={post.authorName} className="w-8 h-8 rounded-full" />
                                <div className="flex flex-col flex-grow">
                                    <h1 className="text-sm">{post.authorName} on <span className="text-accent">$APPL</span></h1>
                                    <p className="text-sm">{post.body}</p>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={
                                        () => likePost(post.id)
                                    } className="btn btn-sm z-10">
                                        {post.likes} ❤️
                                    </button>
                                    {/* <button className="btn btn-sm z-10">
                                        {post.Replies ? post.Replies.length : 0} 💬
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>

                }

            </div>
        </div>

    )
}