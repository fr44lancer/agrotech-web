import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { cookies } from 'next/headers'

import type { Header } from '@/payload-types'

export async function Header() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'hy'
  
  const headerData: Header = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} locale={locale} />
}
