import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getSiteTranslations = cache(async (locale: string) => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({
    slug: 'siteTranslations',
    locale: locale as any,
  })
})
