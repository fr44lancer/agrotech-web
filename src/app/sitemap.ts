import type { MetadataRoute } from 'next'
import { BasePayload, getPayload, PaginatedDocs } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { Event, Page, Post, Product, ProductCategory } from '@/payload-types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload: BasePayload = await getPayload({ config })
  const posts: PaginatedDocs<Post> = await payload.find({
    collection: 'posts',
    limit: 0,
    locale: 'all',
    where: { _status: { equals: 'published' } },
  })

  const pages: PaginatedDocs<Page> = await payload.find({
    collection: 'pages',
    limit: 0,
    locale: 'all',
    where: { _status: { equals: 'published' } },
  })

  const events: PaginatedDocs<Event> = await payload.find({
    collection: 'events',
    limit: 0,
    locale: 'all',
    where: {},
  })

  const productCategories: PaginatedDocs<ProductCategory> = await payload.find({
    collection: 'productCategories',
    depth: 0,
    limit: 0,
    locale: 'all',
    where: {},
  })

  const products: PaginatedDocs<Product> = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 0,
    locale: 'all',
    where: {},
  })
  const mappedProducts: any = []
  products.docs.map((product: any) =>
    product.categories?.map((category: any) => {
      product.cSlug = category.slug
      mappedProducts.push(product)
    }),
  )

  const url: string = getServerSideURL()

  return [
    ...pages.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 1,
      changeFrequency: 'weekly' as any,
      alternates: {
        languages: {
          en: `${url}/en/${slug}`,
          hy: `${url}/hy/${slug}`,
          ru: `${url}/ru/${slug}`,
        },
      },
    })),
    ...productCategories.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/products/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 1,
      changeFrequency: 'weekly' as any,
      alternates: {
        languages: {
          en: `${url}/en/products/${slug}`,
          hy: `${url}/hy/products/${slug}`,
          ru: `${url}/ru/products/${slug}`,
        },
      },
    })),
    ...mappedProducts.map((product: any) => ({
      url: `${url}/products/${product.cSlug}/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      priority: 1,
      changeFrequency: 'weekly' as any,
      alternates: {
        languages: {
          en: `${url}/en/products/${product.cSlug}/${product.slug}`,
          hy: `${url}/hy/products/${product.cSlug}/${product.slug}`,
          ru: `${url}/ru/products/${product.cSlug}/${product.slug}`,
        },
      },
    })),
    ...posts.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/blog/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: 'weekly' as any,
      alternates: {
        languages: {
          en: `${url}/en/blog/${slug}`,
          hy: `${url}/hy/blog/${slug}`,
          ru: `${url}/ru/blog/${slug}`,
        },
      },
    })),
    ...events.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/event/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: 'weekly' as any,
      alternates: {
        languages: {
          en: `${url}/en/event/${slug}`,
          hy: `${url}/hy/event/${slug}`,
          ru: `${url}/ru/event/${slug}`,
        },
      },
    })),
  ]
}
