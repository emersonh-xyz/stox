'use client';

import { getLocaleLanguage, setLocaleLanguage } from "@/app/utility/language";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react";

export function OnbWelcomeCard() {

    const [isOpen, setIsOpen] = useState(true);

    const [language, setLanguage] = useState('en');

    function toggleLanguage() {
        setLanguage(language === 'en' ? 'fr' : 'en');
        setLocaleLanguage(language === 'en' ? 'fr' : 'en');
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent >
                <DialogHeader >
                    <DialogTitle className="text-4xl text-center mb-2">
                        {language === 'en' ? 'Welcome to StoX.' : 'Bienvenue à StoX.'}
                    </DialogTitle>
                    <DialogDescription className="text-md">
                        {language === 'en' ? `Get ready to take control of your financial future. Our site is designed to make stock markets fun for everyone,
                        whether you're a beginner or seasoned investor. With real-time market data, and community, you can make informed decisions with confidence.` :
                            `Préparez-vous à prendre le contrôle de votre avenir financier. Notre site est conçu pour rendre les marchés boursiers amusants pour tout le monde,
                            que vous soyez débutant ou investisseur chevronné. Avec des données de marché en temps réel et une communauté, vous pouvez prendre des décisions éclairées en toute confiance.`}
                        <br />      <br />
                        {language === 'en' ? `Let's get started!` : `Commençons!`}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                    <button onClick={toggleLanguage} className="btn btn-sm btn-secondary">
                        {language === 'en' ? 'Français' : 'English'}
                        <ArrowRight />
                    </button>
                    <a href="/app?onboarding=2">
                        <button className="btn btn-sm btn-secondary">
                            {language === 'en' ? 'Next' : 'Suivant'}
                            <ArrowRight />
                        </button>
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function OnboardingCard({ title, description, nextLink }: { title: string, description: string, nextLink: string }) {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="text-4xl text-center mb-2"
                    >{title}</DialogTitle>
                    <DialogDescription className="text-md">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end">
                    {nextLink === 'done' ? <a></a> :
                        <a href={nextLink}>
                            <button className="btn btn-sm btn-secondary">
                                <ArrowRight />
                            </button>
                        </a>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}