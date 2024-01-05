import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      "one-mobile-bold": ["One Mobile Bold", "sans-serif"],
      "one-mobile-regular": ["One Mobile Regular", "sans-serif"],
      "spoqahansansneo-bold": ["SpoqaHanSansNeo Bold", "sans-serif"],
      "spoqahansansneo-regular": ["SpoqaHanSansNeo Regular", "sans-serif"],
    },
    colors: {
      primary: {
        DEFAULT: "var(--primary)",
        light: "var(--primary-light)",
        dark: "var(--primary-deep)",
      },
      secondary: {
        green: {
          DEFAULT: "var(--secondary-green)",
          light: "var(--secondary-green-light)",
          dark: "var(--secondary-green-deep)",
        },
        red: {
          DEFAULT: "var(--secondary-red)",
          light: "var(--secondary-red-light)",
          dark: "var(--secondary-red-deep)",
        },
        yellow: {
          DEFAULT: "var(--secondary-yellow)",
          dark: "var(--secondary-yellow-deep)",
        },
      },
      grayscale: {
        DEFAULT: "var(--grayscale-gray)",
        white: "var(--grayscale-white)",
        pale: "var(--grayscale-pale-gray)",
        weak: "var(--grayscale-weak-gray)",
        light: "var(--grayscale-lightgray)",
        neutral: "var(--grayscale-neutral-gray)",
        deep: "var(--grayscale-deep-gray)",
        dark: "var(--grayscale-darkgray)",
        black: "var(--grayscale-black)",
      },
      transparent: "transparent",
    },
    keyframes: {
      hide: {
        from: { opacity: "1" },
        to: { opacity: "0" },
      },
      slideIn: {
        from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        to: { transform: "translateX(0)" },
      },
      swipeOut: {
        from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
        to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
      },
      slideUpAndFade: {
        "0%": { opacity: "0", transform: "translateY(2px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      slideUpAndFade2: {
        "0%": { opacity: "0", transform: "translateY(50px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      slideRightAndFade: {
        "0%": { opacity: "0", transform: "translateX(-2px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      slideDownAndFade: {
        "0%": { opacity: "0", transform: "translateY(-2px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      slideLeftAndFade: {
        "0%": { opacity: "0", transform: "translateX(2px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      slideRightUpAndFade: {
        "0%": { opacity: "0", transform: "translate(-500px, 500px);" },
        "100%": { opacity: "1", transform: "translate(0, 0)" },
      },
      slideLeftDownAndFade: {
        "0%": { opacity: "0", transform: "translate(500px, -500px);" },
        "100%": { opacity: "1", transform: "translate(0, 0)" },
      },
    },
    animation: {
      hide: "hide 100ms ease-in",
      slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      swipeOut: "swipeOut 100ms ease-out",
      slideUpAndFade: "slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
      slideDownAndFade: "slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
      slideRightAndFade:
        "slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
      slideLeftAndFade: "slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
      full: "var(--radius-full)",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
