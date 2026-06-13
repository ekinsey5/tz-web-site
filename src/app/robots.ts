import type { MetadataRoute } from "next";

const SITE_URL = "https://www.tether-zero.com"; // [PLACEHOLDER] marketing domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
