/** @type {import('next').NextConfig} */
const nextConfig = {
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
    },

    async redirects() {
        return [
            {
                source: '/visit/pricing',
                destination: '/pricing-and-admission',
                permanent: true,
            },
            {
                source: '/admission',
                destination: '/pricing-and-admission',
                permanent: true,
            },
            {
                source: '/about/the-history',
                destination: '/the-history',
                permanent: true,
            },
            {
                source: '/crazy-horse/the-history',
                destination: '/the-history',
                permanent: true,
            },
            {
                source: '/pictograph',
                destination: '/the-story/pictograph',
                permanent: true,
            },
            {
                source: '/the-story-of-the-mountain/pictograph',
                destination: '/the-story/pictograph',
                permanent: true,
            },
            {
                source: '/carving-crazy-horse',
                destination: '/the-mountain/carving-crazy-horse-mountain',
                permanent: true,
            },
            {
                source: '/the-mountain/carving',
                destination: '/the-mountain/carving-crazy-horse-mountain',
                permanent: true,
            },
            {
                source: '/volksmarch',
                destination: '/event/volksmarch',
                permanent: true,
            },
            {
                source: '/events/volksmarch',
                destination: '/event/volksmarch',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
