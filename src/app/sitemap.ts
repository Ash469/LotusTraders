import { MetadataRoute } from 'next'
import productsData from '../data/Lotus.search.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lotustradersmachinery.com'
  
  // Get all products
  const products = productsData.map(product => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ]

  return [...routes, ...products]
}
