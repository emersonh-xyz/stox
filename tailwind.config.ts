import type { Config } from "tailwindcss";
import { shadcnPreset } from "shadcn-ui";


const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	daisyui: {
		themes: [
			'light',
			'dark',
			'cyberpunk',
			'aqua',
			'lofi',
			'coffee',
			'valentine',
			'emerald',
			'dracula',
			'emerald',
			'black',
			'business',
		]
	},

	plugins: [
		require("tailwindcss-animate"),
		require('daisyui'),
		

	],
    theme: {
    	extend: {
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    }
};
export default config;
