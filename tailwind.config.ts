import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

// import {fontFamily} from "tailwindcss/defaultTheme";
 
const svgToDataUri = require("mini-svg-data-uri");
 
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			sans: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANYekan: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXBlack: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXExtraBold: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXBold: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXDemiBold: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXMedium: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXRegular: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXLight: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXUltraLight: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
			IRANSansXThin: ['var(--font-iranyekan)', 'Arial', 'Helvetica', 'sans-serif'],
		  },
		zIndex: {
			'max': '99999999999', // Add a custom max z-index value
		  },
		animation: {
			scroll:
			  "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
		  },
		  keyframes: {
			scroll: {
			  to: {
				transform: "translate(calc(-50% - 0.5rem))",
			  },
			},
		  },
  		
  		colors: {
			page: "var(--page-bg)",
			"page-text": "var(--page-text)",
			"page-muted": "var(--page-text-muted)",
			"page-subtle": "var(--page-text-subtle)",
			"accent-cosmic": "var(--accent)",
			"accent-cosmic-fg": "var(--accent-foreground)",
			"tech-card": "var(--tech-card-bg)",
			"tech-card-border": "var(--tech-card-border)",
			"tech-card-text": "var(--tech-card-text)",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			
  		},
  		
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	function ({ addUtilities }: { addUtilities: (utils: Record<string, Record<string, string>>) => void }) {
		const family = "var(--font-iranyekan), Arial, Helvetica, sans-serif";
		addUtilities({
			".font-IRANSansXThin": { fontFamily: family, fontWeight: "100" },
			".font-IRANSansXUltraLight": { fontFamily: family, fontWeight: "200" },
			".font-IRANSansXLight": { fontFamily: family, fontWeight: "300" },
			".font-IRANSansXRegular": { fontFamily: family, fontWeight: "400" },
			".font-IRANSansXMedium": { fontFamily: family, fontWeight: "500" },
			".font-IRANSansXDemiBold": { fontFamily: family, fontWeight: "600" },
			".font-IRANSansXBold": { fontFamily: family, fontWeight: "700" },
			".font-IRANSansXExtraBold": { fontFamily: family, fontWeight: "800" },
			".font-IRANSansXBlack": { fontFamily: family, fontWeight: "900" },
		});
	},
	function ({ matchUtilities, theme }: any) {
		matchUtilities(
		  {
			"bg-grid": (value: any) => ({
			  backgroundImage: `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
			  )}")`,
			}),
			"bg-grid-small": (value: any) => ({
			  backgroundImage: `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
			  )}")`,
			}),
			"bg-dot": (value: any) => ({
			  backgroundImage: `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
			  )}")`,
			}),
		  },
		  { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
		);
	  },

  ],
} satisfies Config;