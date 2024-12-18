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
			{
				'oj': {
					'primary': '#fbdaba',
					'primary-focus': '#4506cb',
					'primary-content': '#ffffff',

					'secondary': '#f000b8',
					'secondary-focus': '#bd0091',
					'secondary-content': '#ffffff',

					'accent': '#37cdbe',
					'accent-focus': '#2ba69a',
					'accent-content': '#ffffff',

					'neutral': '#3b424e',
					'neutral-focus': '#2a2e37',
					'neutral-content': '#ffffff',

					'base-100': '#ffffff',
					'base-200': '#f9fafb',
					'base-300': '#8395a7',
					'base-content': '#1e2734',

					'info': '#1c92f2',
					'success': '#009485',
					'warning': '#ff9900',
					'error': '#ff5724',

					'--rounded-box': '1rem',
					'--rounded-btn': '.5rem',
					'--rounded-badge': '1.9rem',

					'--animation-btn': '.25s',
					'--animation-input': '.2s',

					'--btn-text-case': 'uppercase',
					'--navbar-padding': '.5rem',
					'--border-btn': '1px',
				},
			},
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
			'halloween',
			'business'
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
