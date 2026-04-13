import config from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload, PaginatedDocs } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'
import { Event, Page, Post, ProductCategory } from '@/payload-types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const url: string = getServerSideURL()

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

  return [
    ...pages.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 1
    })),
    ...productCategories.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/products/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 1
    })),
    ...posts.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/blog/${slug}`,
      lastModified: new Date(updatedAt),
    })),
    ...events.docs.map(({ slug, updatedAt}) => ({
      url: `${url}/event/${slug}`,
      lastModified: new Date(updatedAt),
    }))
  ]
}