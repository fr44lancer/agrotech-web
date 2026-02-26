import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import { hy } from '@payloadcms/translations/languages/hy'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { Categories } from '@/collections/Categories'
import { Header } from '@/Header/config'
import { Footer } from '@/Footer/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: 'http://localhost:3000',
      collections: ['pages'],
    },
  },
  collections: [Users, Media, Categories, Pages, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { hy, en, ru },
  },
  localization: {
    locales: ['hy', 'en', 'ru'],
    defaultLocale: 'hy',
    fallback: true,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URL || '',
  }),
  globals: [Header, Footer],
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
