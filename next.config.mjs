/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    qualities: [75, 80, 95, 100],
  },
};

export default nextConfig;
