/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  extend: {
    textShadow: {
      default: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
        },
        ".text-shadow-lg": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 1)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
  env: {
    EMAIL: "sarko.events@gmail.com",
    EMAIL_APP_PASSWORD: "swec aath tpez jswv",
  },
};

export default nextConfig;
