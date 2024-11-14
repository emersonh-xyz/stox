'use client';

import { toggleWidget } from "@/app/utility/widgets";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Eye, Sparkles, TrendingUp, BarChart3, Newspaper, Users } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default function WidgetAdder({ openWidget }: { openWidget: boolean }) {
    const [isOpen, setIsOpen] = useState(openWidget);
    const widgets = [
        { name: "Watch List", icon: Eye, index: 0 },
        { name: "Lucky Stock", icon: Sparkles, index: 1 },
        { name: "Big Graph", icon: TrendingUp, index: 2 },
        { name: "Market Status", icon: BarChart3, index: 3 },
        { name: "Company News", icon: Newspaper, index: 4 },
        { name: "Social Feed", icon: Users, index: 5 },
    ]

    function Menu() {
        return (
            <div className={`z-50 absolute mt-8 left-0 transform -translate-x-full w-96 h-48  animate-in px-2 rounded-3xl
            ${openWidget && 'z-50'}`}>
                <Card className="w-96 border-none bg-base-300">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                            {widgets.map((widget) => (
                                <Button
                                    key={widget.index}
                                    className="h-24 flex flex-col items-center justify-center gap-2 bg-base-100  "
                                    onClick={() => toggleWidget(widget.index)}
                                >
                                    <widget.icon className="h-6 w-6" />
                                    <span className="text-sm font-medium">{widget.name}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative">
            <PlusCircleIcon
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 hover:cursor-pointer"
            />
            {isOpen && <Menu />}
        </div>
    );
}
