'use client';

import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

export default function SettingsPage() {
    // State for managing selected language
    const [language, setLanguage] = useState('English');

    // Translations for each language
    const translations = {
        English: {
            themeSelector: 'Theme Selector',
            languageSelector: 'Language Selector',
        },
        French: {
            themeSelector: 'Sélecteur de thème',
            languageSelector: 'Sélecteur de langue',
        },
    };

    useEffect(() => {
        themeChange(false); // 👆 false parameter is required for React projects
    }, []);

    // Handler to change language
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div>
            <h1>{translations[language].themeSelector}</h1>
            <select data-choose-theme>
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

            <h1>{translations[language].languageSelector}</h1>
            <select value={language} onChange={handleLanguageChange}>
                <option value="English">English</option>
                <option value="French">French</option>
            </select>
        </div>
    );
}