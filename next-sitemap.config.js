module.exports = {
  siteUrl: 'https://www.lotustradersmachinery.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/private/', '/api/', '/tmp/'] },
      { userAgent: 'Googlebot-Image', allow: ['/images/', '/assets/images/'] },
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
    ],
    additionalSitemaps: [],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/**', '/private/**'],
  sourceDir: 'public',
  outDir: 'public',
}
