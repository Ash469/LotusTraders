/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.lotustradersmachinery.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { 
        userAgent: '*', 
        allow: '/',
        disallow: [
          '/admin/*',
          '/private/*',
          '/api/*',
          '/tmp/*',
          '/*.json$',
          '/*?*'
        ]
      },
      { 
        userAgent: 'Googlebot-Image',
        allow: [
          '/images/*',
          '/assets/images/*',
          '/*.jpg$',
          '/*.png$',
          '/*.webp$'
        ]
      },
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: '*-dex', disallow: '/' },
    ],
    additionalSitemaps: [
      'https://www.lotustradersmachinery.com/server-sitemap.xml',
      'https://www.lotustradersmachinery.com/products-sitemap.xml'
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin/**',
    '/private/**',
    '/api/**',
    '/tmp/**',
    '/*.json',
  ],
  sourceDir: 'public',
  outDir: 'public',
  autoLastmod: true,
  generateIndexSitemap: true,
  transform: async (config, path) => {
    // Custom transform function for fine-grained control
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
