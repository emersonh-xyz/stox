'use client';

import { OnbWelcomeCard } from "@/components/OnboardingCard";
import WidgetAdder from "@/components/WidgetAdder";
import { UserButton } from "@clerk/nextjs"
import { Home, Info, Newspaper, PlusCircleIcon, Settings, Users } from "lucide-react"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {


    const [isOnboarding, setIsOnboarding] = useState(false);
    const searchParams = useSearchParams()
    const onboarding = searchParams.get('onboarding')

    useEffect(() => {
        // get query params


        if (onboarding) {
            setIsOnboarding(true);
        }

        // if (onboarding) {
        //     const modal = document.getElementById("modal_1");
        //     if (modal) {
        //         modal.showModal();
        //     }
        // }


        themeChange(false)
        // 👆 false parameter is required for react project

    }, [onboarding])

    return (
        // <ClerkProvider>
        <html lang="en" >
            <body className="flex flex-col h-screen ">
                {isOnboarding && <OnbWelcomeCard />}
                <div className="flex justify-between items-center w-full p-4 px-20 bg-base-300 shadow-md">
                    <div className="flex items-center gap-4">
                        <h1 className="text-5xl font-thin">M o o n S t o X.</h1>

                        <h1 className="text-5xl font-thin">S t o X.</h1>
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

                <div className="flex justify-between ">
                    <div className="py-14 px-2 m-12 rounded-full bg-base-300 drop-shadow-md shadow-md flex items-center ">
                        <ul className="flex flex-col items-center gap-12">
                            <a href="/app">
                                <Home className="side-nav-item" width={25} height={25} />
                            </a>
                            <a href="/app/social">
                                <Users className="side-nav-item" width={25} height={25} />
                            </a>
                            <a href="/app/news">
                                <Newspaper className="side-nav-item" width={25} height={25} />
                            </a>
                            <a href="/app/info">
                                <Info className="side-nav-item" width={25} height={25} />
                            </a>
                            <a href="/app/settings">
                                <Settings className="side-nav-item" width={25} height={25} />
                            </a>
                        </ul >
                    </div >
                    <div className="flex justify-center p-20">
                        {children}
                    </div>
                    <div className="py-8 px-24">
                        <WidgetAdder />
                    </div>
                </div>
            </body >
        </html >
        // </ClerkProvider>
    )
}
