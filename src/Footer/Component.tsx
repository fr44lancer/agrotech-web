import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export async function Footer({ locale = 'hy' }: { locale?: string }) {
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-gray-700 dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} locale={locale} />
            })}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AGROTECH LLC</h3>
            <p className="text-gray-400">
              Supplying greenhouses and farmers with high-quality products and agronomic guidance
              since 2014.
            </p>
            <p className="text-gray-400 mt-2 text-sm">Abovyan city, Kotayk region, Armenia</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="about.html"
                  className="text-gray-400 hover:text-white transition hover:pl-2 inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="products.html"
                  className="text-gray-400 hover:text-white transition hover:pl-2 inline-block"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="events.html"
                  className="text-gray-400 hover:text-white transition hover:pl-2 inline-block"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="careers.html"
                  className="text-gray-400 hover:text-white transition hover:pl-2 inline-block"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="partners.html"
                  className="text-gray-400 hover:text-white transition hover:pl-2 inline-block"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="contacts.html"
                  className="text-gray-400 hover:text-white transition hover:pl-2 inline-block"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition hover:pl-2 inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition hover:pl-2 inline-block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get the latest updates</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-l text-sm text-gray-800 flex-1 focus:outline-none focus:ring-2 focus:ring-teal"
              />
              <button
                type="submit"
                className="bg-teal px-4 py-2 rounded-r text-sm hover:bg-teal-light transition shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AGROTECH LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
