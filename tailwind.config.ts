import type { Config } from "tailwindcss";

/**
 * Tether Zero marketing theme.
 * Tokens mirror the app design system (colors_and_type.css / Design.md),
 * extended with marketing-only display type sizes for the landing page.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // teal-700 used as the base so white text and teal text both meet
          // WCAG AA (4.5:1) contrast; teal-600 (#0D9488) is reserved for
          // decorative accents via `brand-bright`.
          DEFAULT: "#0F766E", // teal-700 — text, buttons, active states (AA-safe)
          hover: "#115E59", // teal-800 — button hover
          bright: "#0D9488", // teal-600 — decorative accents only
          light: "#14B8A6", // teal-500
          tint: "#CCFBF1", // teal-100
          ink: "#030213", // near-black (app primary action color)
        },
        page: "#F9FAFB",
        surface: "#FFFFFF",
        subtle: "#F3F4F6",
        line: {
          DEFAULT: "#E5E7EB",
          strong: "#D1D5DC",
        },
        ink: {
          DEFAULT: "#1F2937", // text primary
          strong: "#101828", // headings
        },
        body: "#374151",
        muted: "#6B7280",
        faint: "#9CA3AF",
        success: {
          DEFAULT: "#10B981",
          strong: "#008236", // AA-safe green for text on light surfaces
          bg: "#F0FDF4",
        },
        danger: {
          DEFAULT: "#DC2626",
          strong: "#E7000B",
          bg: "#FEF2F2",
        },
        info: {
          DEFAULT: "#155DFC",
          bg: "#EFF6FF",
        },
        warning: "#D97706",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        // Marketing display scale (clamped, responsive)
        display: [
          "clamp(2.5rem, 1.6rem + 4vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-sm": [
          "clamp(2rem, 1.4rem + 3vw, 2.75rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.625rem, 1.2rem + 1.6vw, 2rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        h3: [
          "1.25rem",
          { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        lead: ["1.125rem", { lineHeight: "1.7" }],
      },
      borderRadius: {
        lg: "8px",
        xl: "12px",
        "2xl": "14px",
      },
      boxShadow: {
        "tz-xs": "0 1px 2px 0 rgba(0,0,0,0.04)",
        "tz-sm": "0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 3px 0 rgba(0,0,0,0.05)",
        "tz-md":
          "0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)",
        "tz-lg":
          "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.05)",
      },
      maxWidth: {
        container: "1152px",
        prose: "65ch",
      },
      transitionTimingFunction: {
        tz: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
