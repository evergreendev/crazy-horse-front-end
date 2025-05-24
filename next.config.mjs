/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        removeConsole: false,
    },
    images: process.env.NODE_ENV === "production" ? {
        remotePatterns: [
            {
                hostname: process.env.NEXT_PUBLIC_REMOTE_IMAGE_URL
            }
        ]
    } : {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
        ],
    }
};

export default nextConfig;
