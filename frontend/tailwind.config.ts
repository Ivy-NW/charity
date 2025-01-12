const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: "#5B21B6", // Deep Purple
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        secondary: {
          DEFAULT: "#0D9488", // Teal
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        accent: {
          DEFAULT: "#FF6B6B", // Coral for CTAs
          hover: "#FF8787",
        },
        mint: {
          DEFAULT: "#4FD1C5", // Mint for success states
          light: "#9DECF9",
        },
        background: {
          DEFAULT: "#F8FAFC", // Off-white background
          glass: "rgba(248, 250, 252, 0.8)",
        },
        // Semantic Colors
        success: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          600: "#059669",
        },
        error: {
          DEFAULT: "#EF4444",
          50: "#FEF2F2",
          600: "#DC2626",
        },
        warning: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          600: "#D97706",
        },
        info: {
          DEFAULT: "#3B82F6",
          50: "#EFF6FF",
          600: "#2563EB",
        },
        // UI Colors
        backgrounds: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--card-background) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        'pill': '9999px',
        DEFAULT: '12px', // New default border radius
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'var(--font-sans)', 'system-ui'],
        'inter': ['Inter', 'var(--font-sans)', 'system-ui'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        "screen-10": "10vh",
        "screen-80": "80vh",
      },
      height: {
        "screen-90": "90vh",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        glow: "0 0 4px rgb(0 0 0 / 0.1)",
        "glow-lg": "0 0 8px rgb(0 0 0 / 0.1)",
      },
      opacity: {
        15: "0.15",
        85: "0.85",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add plugin for custom utilities if needed
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.glassmorphism': {
          'background': 'rgba(255, 255, 255, 0.2)',
          'backdrop-filter': 'blur(8px)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
          'box-shadow': '0 4px 30px rgba(0, 0, 0, 0.1)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};

export default config;
