import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ContactLocation } from '@/payload-types'
import { PageHeroBlockComponent } from '@/blocks/PageHero/Component'

type Args = {
  params: Promise<{ locale?: string }>
}

const translations = {
  en: {
    title: 'Contact Us',
    subtitle: "We're here to help and answer any questions you might have",
    infoTitle: 'Get in Touch',
    desc: 'Whether you have a question about our products, need expert agronomic advice, or want to explore partnership opportunities, our team is ready to answer all your questions.',
    addressTitle: 'Visit Our Office',
    addressText: '2nd Industrial District 3, Abovyan city',
    callUs: 'Call Us',
    phone1: '+374 10 123 456',
    phone2: '+374 99 123 456',
    emailUs: 'Email Us',
    emailText: 'info@agrotech.am',
    supportText: 'support@agrotech.am',
    viewMap: 'View on Google Maps',
    formTitle: 'Send Us a Message',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    company: 'Company',
    subject: 'Subject',
    subjectOptions: [
      { value: 'general', label: 'General Inquiry' },
      { value: 'products', label: 'Product Information' },
      { value: 'partnership', label: 'Partnership Opportunities' },
      { value: 'support', label: 'Technical Support' },
      { value: 'sales', label: 'Sales Inquiry' },
      { value: 'careers', label: 'Career Opportunities' },
      { value: 'investor', label: 'Investor Relations' },
    ],
    message: 'Message',
    send: 'Send Message',
    officesTitle: 'Our Offices',
    departmentsTitle: 'Department Contacts',
    viewOnMap: 'View on Map',
  },
  ru: {
    title: 'Связаться с нами',
    subtitle: 'Мы здесь, чтобы помочь и ответить на любые ваши вопросы',
    infoTitle: 'Свяжитесь с нами',
    desc: 'Если у вас есть вопрос о наших продуктах, вам нужен совет агронома или вы хотите обсудить возможности партнерства, наша команда готова ответить на все ваши вопросы.',
    addressTitle: 'Посетите наш офис',
    addressText: '2-й промышленный район 3, г. Абовян',
    callUs: 'Позвоните нам',
    phone1: '+374 10 123 456',
    phone2: '+374 99 123 456',
    emailUs: 'Напишите нам',
    emailText: 'info@agrotech.am',
    supportText: 'support@agrotech.am',
    viewMap: 'Посмотреть на Google Maps',
    formTitle: 'Отправить сообщение',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Электронная почта',
    phone: 'Номер телефона',
    company: 'Компания',
    subject: 'Тема',
    subjectOptions: [
      { value: 'general', label: 'Общий запрос' },
      { value: 'products', label: 'Информация о продуктах' },
      { value: 'partnership', label: 'Возможности партнерства' },
      { value: 'support', label: 'Техническая поддержка' },
      { value: 'sales', label: 'Коммерческий запрос' },
      { value: 'careers', label: 'Карьерные возможности' },
      { value: 'investor', label: 'Связи с инвесторами' },
    ],
    message: 'Сообщение',
    send: 'Отправить сообщение',
    officesTitle: 'Наши офисы',
    departmentsTitle: 'Контакты отделов',
    viewOnMap: 'Посмотреть на карте',
  },
  hy: {
    title: 'Կապ մեզ հետ',
    subtitle: 'Մենք այստեղ ենք՝ պատասխանելու ձեր ցանկացած հարցին',
    infoTitle: 'Կապ հաստատեք',
    desc: 'Անկախ նրանից, դուք հարց ունեք մեր արտադրանքի վերաբերյալ, ագրոնոմիական խորհրդատվության կարիք ունեք, թե ցանկանում եք համագործակցության հնարավորություններ որոնել, մեր թիմը պատրաստ է պատասխանել ձեր բոլոր հարցերին:',
    addressTitle: 'Այցելեք մեր գրասենյակ',
    addressText: '2-րդ արդյունաբերական շրջան 3, Աբովյան քաղաք',
    callUs: 'Զանգահարեք մեզ',
    phone1: '+374 10 123 456',
    phone2: '+374 99 123 456',
    emailUs: 'Էլ. փոստ',
    emailText: 'info@agrotech.am',
    supportText: 'support@agrotech.am',
    viewMap: 'Տեսնել Google Maps-ում',
    formTitle: 'Ուղարկեք հաղորդագրություն',
    firstName: 'Անուն',
    lastName: 'Ազգանուն',
    email: 'Էլ. հասցե',
    phone: 'Հեռախոսահամար',
    company: 'Ընկերություն',
    subject: 'Թեմա',
    subjectOptions: [
      { value: 'general', label: 'Ընդհանուր հարց' },
      { value: 'products', label: 'Ապրանքների մասին' },
      { value: 'partnership', label: 'Համագործակցություն' },
      { value: 'support', label: 'Տեխնիկական աջակցություն' },
      { value: 'sales', label: 'Վաճառք' },
      { value: 'careers', label: 'Կարիերայի հնարավորություններ' },
      { value: 'investor', label: 'Ներդրողների հետ կապ' },
    ],
    message: 'Հաղորդագրություն',
    send: 'Ուղարկել',
    officesTitle: 'Մեր գրասենյակները',
    departmentsTitle: 'Բաժինների կոնտակտներ',
    viewOnMap: 'Տեսնել քարտեզի վրա',
  },
}

export const dynamic = 'force-dynamic'

export default async function ContactsPage({ params: paramsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise
  const t = translations[locale as keyof typeof translations] || translations.hy

  const payload = await getPayload({ config: configPromise })

  const [locationsReq, heroReq] = await Promise.all([
    payload.find({
      collection: 'contactLocations',
      locale: locale as any,
      limit: 100,
      sort: 'order',
    }),
    payload.find({
      collection: 'pageHeroes',
      where: { pageKey: { equals: 'contacts' } },
      locale: locale as any,
      limit: 1,
    }),
  ])
  const hero = heroReq.docs[0]

  const offices = locationsReq.docs.filter(
    (l: ContactLocation) => l.type === 'office',
  ) as ContactLocation[]

  const departments = locationsReq.docs.filter(
    (l: ContactLocation) => l.type === 'department',
  ) as ContactLocation[]

  return (
    <div className="w-full">
      {/* Hero */}
      <PageHeroBlockComponent
        title={hero?.title ?? t.title}
        subtitle={hero?.subtitle ?? t.subtitle}
        description={hero?.description}
      />

      {/* Contact Info + Form */}
      <section className="container mx-auto px-6 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — General contact info + map */}
          <div className="space-y-8 flex flex-col h-full">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t.infoTitle}</h2>
              <p className="text-gray-600 mb-8">{t.desc}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{t.addressTitle}</h3>
                    <p className="text-gray-600">{t.addressText}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{t.callUs}</h3>
                    <p className="text-gray-600">{t.phone1}</p>
                    <p className="text-gray-600">{t.phone2}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{t.emailUs}</h3>
                    <p className="text-gray-600">{t.emailText}</p>
                    <p className="text-gray-600">{t.supportText}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner relative flex items-center justify-center group border border-gray-100">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{
                  backgroundImage:
                    "url('https://maps.googleapis.com/maps/api/staticmap?center=Yerevan,Armenia&zoom=12&size=600x300&maptype=roadmap')",
                }}
              />
              <div className="relative z-10 bg-white/90 px-6 py-3 rounded shadow-md text-sm font-semibold text-teal-700 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t.viewMap}
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t.formTitle}</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.firstName}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.lastName}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.email}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.phone}</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" placeholder="+374 __ ___ ___" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.company}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.subject}</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all">
                    {t.subjectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t.message}</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none" />
              </div>

              <button
                type="button"
                className="w-full bg-teal-600 text-white font-semibold flex items-center justify-center py-4 rounded-lg hover:bg-teal-700 transition shadow-md hover:shadow-lg gap-2 mt-4 group"
              >
                {t.send}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Our Offices */}
      {offices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
              {t.officesTitle}
            </h2>
            <LocationGrid locations={offices} viewOnMapLabel={t.viewOnMap} />
          </div>
        </section>
      )}

      {/* Department Contacts — identical card design */}
      {departments.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
              {t.departmentsTitle}
            </h2>
            <LocationGrid locations={departments} viewOnMapLabel={t.viewOnMap} />
          </div>
        </section>
      )}
    </div>
  )
}

function LocationGrid({
  locations,
  viewOnMapLabel,
}: {
  locations: ContactLocation[]
  viewOnMapLabel: string
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <div
          key={location.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          {/* Icon + name */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
              {location.type === 'office' ? (
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800 leading-tight">{location.name}</h3>
          </div>

          <div className="space-y-3">
            {location.address && (
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600 text-sm">{location.address}</span>
              </div>
            )}

            {location.phones && location.phones.length > 0 && (
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="space-y-0.5">
                  {location.phones.map((p, i) => (
                    <a key={i} href={`tel:${p.number}`} className="block text-gray-600 text-sm hover:text-teal-600 transition-colors">
                      {p.number}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {location.email && (
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${location.email}`} className="text-gray-600 text-sm hover:text-teal-600 transition-colors">
                  {location.email}
                </a>
              </div>
            )}
          </div>

          {location.mapUrl && (
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 text-teal-600 text-sm font-semibold hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {viewOnMapLabel}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise
  const title = locale === 'hy' ? 'Կապ' : locale === 'ru' ? 'Контакты' : 'Contact Us'
  return {
    title: `${title} | Agrotech`,
    description: 'Get in touch with Agrotech for agricultural solutions and partnerships.',
  }
}
