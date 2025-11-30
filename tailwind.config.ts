import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  important: true,
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "576px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      fontFamily: {
        display: `"Roboto Condensed", sans-serif`,
        sans: `"Inter", system-ui, sans-serif`,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: {
          50: "#E8EEFD",
          100: "#D0DEFB",
          200: "#A2BCF6",
          300: "#739BF2",
          400: "#447AEE",
          500: "#1659E9",
          600: "#1147BB",
          700: "#0D358C",
          800: "#09235D",
          900: "#04122F",
          950: "#030C21",
          DEFAULT: "#1659E9",
        },
        secondary: {
          50: "#E8FDF6",
          100: "#D0FBED",
          200: "#A1F7DA",
          300: "#72F3C8",
          400: "#43EFB6",
          500: "#14EBA3",
          600: "#10BC83",
          700: "#0C8D62",
          800: "#085E41",
          900: "#042F21",
          950: "#032117",
          DEFAULT: "#14EBA3",
        },
        tertiary: {
          50: "#FDE8E8",
          100: "#FBD0D0",
          200: "#F7A1A1",
          300: "#F37272",
          400: "#EF4343",
          500: "#EB1414",
          600: "#BC1010",
          700: "#8D0C0C",
          800: "#5E0808",
          900: "#2F0404",
          950: "#210303",
          DEFAULT: "#EB1414",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // Chart colors (beautiful gradients!)
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },

        // Sidebar specific (perfect for your collapsible sidebar)
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        main: "0px 4px 10px 0px #1E5E7EB14",
        card: "0 10px 30px -10px rgba(0,0,0,0.08)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        glow: "0 0 30px rgba(37, 99, 235, 0.3)",
      },

      backdropBlur: {
        xs: "2px",
        sm: "8px",
        md: "12px",
        lg: "20px",
      },
    },
  },
  plugins: [],
};

// Add this at the very top of the file (before module.exports)
config.theme = {
  ...config.theme,
  extend: {
    ...config.theme?.extend,
    // Inject CSS variables directly into :root and .dark
    // This is the magic that makes it work
    colors: {
      ":root": {
        "--background": "#ffffff",
        "--foreground": "oklch(0.145 0 0)",
        "--card": "#ffffff",
        "--card-foreground": "oklch(0.145 0 0)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.145 0 0)",
        "--primary": "#030213",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.95 0.0058 264.53)",
        "--secondary-foreground": "#030213",
        "--muted": "#ececf0",
        "--muted-foreground": "#717182",
        "--accent": "#e9ebef",
        "--accent-foreground": "#030213",
        "--destructive": "#d4183d",
        "--destructive-foreground": "#ffffff",
        "--border": "rgba(0, 0, 0, 0.1)",
        "--input": "transparent",
        "--input-background": "#f3f3f5",
        "--ring": "oklch(0.708 0 0)",

        "--chart-1": "oklch(0.646 0.222 41.116)",
        "--chart-2": "oklch(0.6 0.118 184.704)",
        "--chart-3": "oklch(0.398 0.07 227.392)",
        "--chart-4": "oklch(0.828 0.189 84.429)",
        "--chart-5": "oklch(0.769 0.188 70.08)",

        "--sidebar": "oklch(0.985 0 0)",
        "--sidebar-foreground": "oklch(0.145 0 0)",
        "--sidebar-primary": "#030213",
        "--sidebar-primary-foreground": "oklch(0.985 0 0)",
        "--sidebar-accent": "oklch(0.97 0 0)",
        "--sidebar-accent-foreground": "oklch(0.205 0 0)",
        "--sidebar-border": "oklch(0.922 0 0)",

        "--radius": "0.625rem",
      },
      ".dark": {
        "--background": "oklch(0.145 0 0)",
        "--foreground": "oklch(0.985 0 0)",
        "--card": "oklch(0.145 0 0)",
        "--card-foreground": "oklch(0.985 0 0)",
        "--popover": "oklch(0.145 0 0)",
        "--popover-foreground": "oklch(0.985 0 0)",
        "--primary": "oklch(0.985 0 0)",
        "--primary-foreground": "oklch(0.205 0 0)",
        "--secondary": "oklch(0.269 0 0)",
        "--secondary-foreground": "oklch(0.985 0 0)",
        "--muted": "oklch(0.269 0 0)",
        "--muted-foreground": "oklch(0.708 0 0)",
        "--accent": "oklch(0.269 0 0)",
        "--accent-foreground": "oklch(0.985 0 0)",
        "--destructive": "oklch(0.396 0.141 25.723)",
        "--destructive-foreground": "oklch(0.637 0.237 25.331)",
        "--border": "oklch(0.269 0 0)",
        "--ring": "oklch(0.439 0 0)",

        "--chart-1": "oklch(0.488 0.243 264.376)",
        "--chart-2": "oklch(0.696 0.17 162.48)",
        "--chart-3": "oklch(0.769 0.188 70.08)",
        "--chart-4": "oklch(0.627 0.265 303.9)",
        "--chart-5": "oklch(0.645 0.246 16.439)",

        "--sidebar": "oklch(0.205 0 0)",
        "--sidebar-foreground": "oklch(0.985 0 0)",
        "--sidebar-primary": "oklch(0.488 0.243 264.376)",
        "--sidebar-primary-foreground": "oklch(0.985 0 0)",
      },
    },
  },
};

export default config;
