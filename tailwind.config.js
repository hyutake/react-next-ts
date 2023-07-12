/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary-blue-90": "#032F9A",
        "primary-blue-005": "#E1F0FF",
        "primary-blue-80": "#1E4BB8",
        "cool-gray-90": "#1D232B",
        "cool-gray-100": "#0C0D0D",
        "cool-gray-80": "#2D3642",
        "cool-gray-20": "#BBC5D0",
        "orange-30": "#F7BA50",
        "orange-90": "#C75100",
      }
    },
  },
  plugins: [],
}
