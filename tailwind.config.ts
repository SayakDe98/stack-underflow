import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      boxShadow: {
        bannerCustomBoxShadow:
          "inset 0 8px 8px -8px rgba(0,0,0,.3), inset 0 -8px 8px -8px rgba(0,0,0,.3)",
      },
      dropShadow: {
        bannerDropShadow: "0 1px 3px rgba(0,0,0,.3)",
      },
    },
  },
};
export default config;
