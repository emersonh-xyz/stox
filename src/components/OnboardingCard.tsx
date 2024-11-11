'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRight } from "lucide-react"
import { useState } from "react";

export function OnbWelcomeCard() {

    const [isOpen, setIsOpen] = useState(true);




    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent >
                <DialogHeader >
                    <DialogTitle className="text-4xl text-center">Welcome to StoX</DialogTitle>
                    <DialogDescription className="text-md">
                        Get ready to take control of your financial future. Our site is designed to make stock markets fun for everyone,
                        whether you're a beginner or seasoned investor. With real-time market data, and community, you can make informed decisions with confidence.
                        <br />      <br />
                        Let's get started on your investment journey--just a few quick steps to learn StoX. and you'll be on your way to creating your personal board!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                    <button className="btn btn-secondary">
                        Français <ArrowRight />
                    </button>
                    <button className="btn btn-secondary">
                        Next <ArrowRight />
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function OnboardingCard({ title, description }: { title: string, description: string }) {
    return (
        <Dialog open >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Welcome to Stox</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}