import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [typography, forms, daisyui],
	daisyui: {
		themes: ['light', 'dark', 'synthwave'],
		darkTheme: 'dark',
	},
};
