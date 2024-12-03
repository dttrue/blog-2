/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home", // Points to the correct home page
        permanent: true,
      },
    ];
  },
 
};

export default nextConfig;
