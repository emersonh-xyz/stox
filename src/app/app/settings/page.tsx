'use client';

import { getLocaleLanguage, setLocaleLanguage } from '@/app/utility/language';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

export default function SettingsPage() {

    useEffect(() => {
        setLanguage(getLocaleLanguage());
    }, [])

    const [language, setLanguage] = useState<string>();

    // Handler to change language
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
        setLocaleLanguage(e.target.value);
    };

    return (

        <div>
            <h1 className="text-4xl font-bold">{language === 'fr' ? 'Préférences' : 'Preferences'}</h1>

            <div className="px-40 py-24 flex items-center gap-12">
                <div className="w-1 h-[400px] bg-base-300"></div>
                {/* <h1>{translations[language].themeSelector}</h1> */}
                <div className="flex flex-col gap-20">

                    <div className="flex gap-20 items-center ">
                        <h1>{language === 'fr' ? 'Thème' : 'Theme'}</h1>
                        <select className="select bg-base-300 " data-choose-theme>
                            <option value="oj">OJ</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="cyberpunk">Cyberpunk</option>
                            <option value="aqua">Aqua</option>
                            <option value="lofi">Lofi</option>
                            <option value="coffee">Coffee</option>
                            <option value="valentine">Valentine</option>
                            <option value="emerald">Emerald</option>
                            <option value="dracula">Dracula</option>
                            <option value="black">Black</option>
                            <option value="business">Business</option>
                        </select>
                    </div>

                    <div className="flex gap-20 items-center w-full">
                        <h1>{language === 'fr' ? 'Langue' : 'Language'}</h1>
                        <select className="select bg-base-300 w-fit" value={language} onChange={handleLanguageChange}>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                        </select>
                    </div>
                </div>

            </div>
        </div >
    );
}