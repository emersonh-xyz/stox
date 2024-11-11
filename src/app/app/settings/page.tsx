'use client';

import { useEffect } from 'react'
import { themeChange } from 'theme-change'

export default function SettingsPage() {

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project

    }, [])

    return (
        <div>
            <h1>Theme selector</h1>
            <select data-choose-theme>
                <option value="oj">OJ</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="cyberpunk">Cyberpunk</option>
                <option value="aqua">Aqua</option>
                <option value="lofi">Lofi</option>
                <option value="coffee">Coffee</option>
                <option value="valentine">Valentine</option>
                <option value="business">Business</option>
                <option value="halloween">Halloween</option>
            </select>
        </div>
    )
}