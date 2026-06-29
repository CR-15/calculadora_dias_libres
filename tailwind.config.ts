import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#13202b',
        'ink-soft': '#46586a',
        line: '#d6dee6',
        'line-strong': '#b9c5d0',
        paper: '#f3f6f9',
        card: '#ffffff',
        work: '#1d5a8f',
        'work-bg': '#e8f1f9',
        free: '#3f7d4f',
        'free-bg': '#eaf3ec',
        accent: '#0f3d63',
      },
      fontFamily: {
        sans: [
          '"Segoe UI"',
          'system-ui',
          '-apple-system',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        '2xl': '14px',
      },
    },
  },
  plugins: [],
};

export default config;
