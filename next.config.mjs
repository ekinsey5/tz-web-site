/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // emit a fully static site to ./out
  // Emit directory-style pages (out/privacy-policy/index.html) so the CloudFront
  // edge router's "/path -> /path/index.html" rewrite resolves to a real S3 key.
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true, // required: next/image (Screenshot.tsx) has no build-time optimizer in static export
  },
};

export default nextConfig;
