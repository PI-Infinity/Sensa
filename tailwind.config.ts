import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mineFont: ["MineFont", "serif"],
        secondFont: ["SecondFont", "serif"],
      },
      screens: {
        tablet: "640px",
        desktop: "1280px",
      },
      textColor: {
        textlight: "#f7fbff",
      },
    },
  },
  plugins: [],
};

export default config;
