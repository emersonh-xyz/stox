'use client';

import { UserButton } from "@clerk/nextjs"
import { Home, Info, Newspaper, Settings, Users } from "lucide-react"
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    useEffect(() => {

        themeChange(false)
        // 👆 false parameter is required for react project

    }, [])


    return (
        // <ClerkProvider>
        <html lang="en" >
            <body className="flex flex-col h-screen ">

                <div className="flex justify-between items-center w-full p-4 px-20 bg-base-300 shadow-md">
                    <div className="flex items-center gap-4">
                        <h1 className="text-5xl font-thin">M o o n S t o X.</h1>

                    </div>
                    <div className="flex items-center gap-4">
                        <UserButton
                            appearance={{
                                "elements": {
                                    'userButtonAvatarBox': {
                                        'width': '40px',
                                        'height': '40px',
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Start Top Navigation Menu */}

                {/* Start Side Navigation Menu */}

                <div className="flex ">
                    <div className="py-14 px-3 m-12 rounded-full bg-base-300 drop-shadow-md shadow-md flex items-center ">
                        <ul className="flex flex-col items-center gap-20">
                            <a href="/app">
                                <Home className="side-nav-item" width={40} height={40} />
                            </a>
                            <a href="/app/social">
                                <Users className="side-nav-item" width={40} height={40} />
                            </a>
                            <a href="/app/news">
                                <Newspaper className="side-nav-item" width={40} height={40} />
                            </a>
                            <a href="/app/info">
                                <Info className="side-nav-item" width={40} height={40} />
                            </a>
                            <a href="/app/settings">
                                <Settings className="side-nav-item" width={40} height={40} />
                            </a>
                        </ul >
                    </div >
                    <div className="flex justify-center p-20">
                        {children}
                    </div>
                </div>
            </body >
        </html >
        // </ClerkProvider>
    )
}
