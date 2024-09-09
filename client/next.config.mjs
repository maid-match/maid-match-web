/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',   // Client-side path
          destination: 'http://localhost:8080/:path*'  // Proxy to external API
        }
      ];
    }
  };
  
  export default nextConfig;
  