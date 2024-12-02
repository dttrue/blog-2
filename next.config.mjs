/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enforces best practices
  swcMinify: true, // Enables SWC compiler for faster builds
  trailingSlash: false, // Ensures URLs are clean without trailing slashes
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home", // Redirect root to a specific route (optional)
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
