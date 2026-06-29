import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        paper: 'var(--paper)',
        card: 'var(--card)',
        work: 'var(--work)',
        'work-bg': 'var(--work-bg)',
        free: 'var(--free)',
        'free-bg': 'var(--free-bg)',
        accent: 'var(--accent)',
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
