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


    return (
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">

        </div>
    );
}