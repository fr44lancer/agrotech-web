import type { MetadataRoute } from 'next'
import { BasePayload, getPayload, PaginatedDocs } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { Event, Page, Post, ProductCategory } from '@/payload-types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //const locales = ['hy', 'en', 'ru']

  const payload: BasePayload = await getPayload({ config })
  const posts: PaginatedDocs<Post> = await payload.find({
    collection: 'posts',
    limit: 0,
      where: { _status: { equals: 'published' } },
  })

  const pages: PaginatedDocs<Page> = await payload.find({
    collection: 'pages',
    limit: 0,
      where: { _status: { equals: 'published' } },
  })

  const events: PaginatedDocs<Event> = await payload.find({
    collection: 'events',
    limit: 0,
    where: {}
  })

  const productCategories: PaginatedDocs<ProductCategory> = await payload.find({
    collection: 'productCategories',
    limit: 0,
    where: {}
  })

  const url: string = getServerSideURL()

  return [
    ...pages.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 1,
      changeFrequency:'weekly' as any,
    })),
    ...productCategories.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/products/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 1,
      changeFrequency: 'weekly' as any
    })),
    ...posts.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/blog/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: 'weekly' as any
    })),
    ...events.docs.map(({ slug, updatedAt}) => ({
      url: `${url}/event/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: 'weekly' as any
    }))
  ]
}
