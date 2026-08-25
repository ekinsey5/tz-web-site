export const LOCALES = ["en", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Locales that get a /[locale] route — everything except the default (English, unprefixed). */
export const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);
