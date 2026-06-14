/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // emit a fully static site to ./out
  reactStrictMode: true,
  images: {
    unoptimized: true, // required: next/image (Screenshot.tsx) has no build-time optimizer in static export
  },
};

export default nextConfig;
