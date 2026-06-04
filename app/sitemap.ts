import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fa", "en"] as const;
  const localeEntries = locales.flatMap((locale) => [
    {
      url: `https://donmohsen.ir/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `https://donmohsen.ir/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `https://donmohsen.ir/${locale}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }
  ]);

  return [
    {
      url: 'https://donmohsen.ir',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...localeEntries
  ]
}