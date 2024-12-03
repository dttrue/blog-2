/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/", // Redirect root
        destination: "/dashboard/home", // Points to the correct home page
        permanent: true,
      },
    ];
  },
  experimental: {
    appDir: true, // Enable app directory
  },
};

export default nextConfig;
