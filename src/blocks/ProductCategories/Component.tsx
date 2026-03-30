import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Props = {
  heading?: string | null
  subheading?: string | null
  learnMoreLabel?: string | null
  locale?: string
}

export async function ProductCategoriesBlockComponent({
  heading,
  subheading,
  learnMoreLabel = 'Learn More →',
  locale = 'hy',
}: Props) {
  const payload = await getPayload({ config: configPromise })
  const { docs: categories } = await payload.find({
    collection: 'productCategories',
    locale: locale as any,
    limit: 100,
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 w-full max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
            )}
            {subheading && <p className="text-gray-600 text-lg">{subheading}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
            >
              {category.image && typeof category.image === 'object' && category.image.url ? (
                <div
                  className="h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image.url})` }}
                />
              ) : (
                <div className="h-48 bg-gradient-to-br from-green-400 to-teal-500 w-full" />
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
                {category.description && (
                  <p className="text-gray-500 text-sm line-clamp-3 flex-1">
                    {category.description}
                  </p>
                )}
                <a
                  href={`/${locale}/products/${category.slug}`}
                  className="text-teal-950 font-semibold hover:underline inline-block mt-auto pt-6"
                >
                  {learnMoreLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
