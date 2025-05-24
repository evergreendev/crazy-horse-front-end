/** @type {import('next').NextConfig} */
const nextConfig = {
    images: process.env.NODE_ENV === "production" ? {
        compiler: {
            removeConsole: false,
        },
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
