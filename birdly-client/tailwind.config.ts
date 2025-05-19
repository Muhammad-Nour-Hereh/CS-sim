import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        'primary-foreground': '#ffffff',
        secondary: '#f59e0b',
        'secondary-foreground': '#000000',
        selected: '#FFAAFF',
        'destructive-background': '#D84848',
      },
    },
  },
  plugins: [],
}

export default config
