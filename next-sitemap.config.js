const axios = require('axios');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://crazyhorsememorial.org', // <- change to your domain
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/home'],

    // Add dynamic paths from CMS
    async additionalPaths() {
        const paths = [];

        try {
            // Fetch pages from CMS
            const pagesUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/pages?limit=100&depth=0`;
            const pagesRes = await axios.get(pagesUrl);

            if (pagesRes.status === 200 && pagesRes.data) {
                const pages = pagesRes.data;
                if (pages && pages.docs) {
                    pages.docs.forEach(page => {
                        if (page.slug) {
                            paths.push({
                                loc: `/${page.slug}`,
                                lastmod: page.updatedAt ? new Date(page.updatedAt).toISOString() : new Date().toISOString(),
                                changefreq: 'weekly',
                                priority: 0.7,
                            });
                        }
                    });
                }
            }

            // Fetch news articles from CMS
            const newsUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/news?limit=100&depth=0`;
            const newsRes = await axios.get(newsUrl);

            if (newsRes.status === 200 && newsRes.data) {
                const news = newsRes.data;
                if (news && news.docs) {
                    news.docs.forEach(article => {
                        if (article.slug) {
                            paths.push({
                                loc: `/news/${article.slug}`,
                                lastmod: article.updatedAt ? new Date(article.updatedAt).toISOString() : new Date().toISOString(),
                                changefreq: 'weekly',
                                priority: 0.7,
                            });
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error generating dynamic sitemap paths:', error);
        }

        return paths;
    },
};
