'use client';

import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

export default function WidgetAdder() {
    const [isOpen, setIsOpen] = useState(false);

    function Menu() {
        return (
            <div className="absolute mt-8 left-0 transform -translate-x-full w-96 h-48 bg-base-300 animate-in px-2">
                <div className="flex flex-col gap-2">
                    <h1>social feed</h1>
                    <h1>watch list</h1>
                    <h1>lucky stock</h1>
                </div>
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
