import React from 'react'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{
    locale?: string
  }>
}

const translations = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in Touch with Agrotech',
    desc: 'Whether you have a question about our products, need expert agronomic advice, or want to explore partnership opportunities, our team is ready to answer all your questions.',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    subject: 'Subject',
    message: 'Your Message',
    send: 'Send Message',
    addressTitle: 'Visit Our Office',
    addressText: '123 Agrotech Avenue, Yerevan, Armenia',
    callUs: 'Call Us',
    phone1: '+374 10 123 456',
    phone2: '+374 99 123 456',
    emailUs: 'Email Us',
    emailText: 'info@agrotech.am',
    supportText: 'support@agrotech.am',
  },
  ru: {
    title: 'Связаться с нами',
    subtitle: 'Свяжитесь с Агротех',
    desc: 'Если у вас есть вопрос о наших продуктах, вам нужен совет агронома или вы хотите обсудить возможности партнерства, наша команда готова ответить на все ваши вопросы.',
    name: 'ФИО',
    email: 'Электронная почта',
    phone: 'Номер телефона',
    subject: 'Тема',
    message: 'Ваше сообщение',
    send: 'Отправить сообщение',
    addressTitle: 'Посетите наш офис',
    addressText: 'Агротех Авеню 123, Ереван, Армения',
    callUs: 'Позвоните нам',
    phone1: '+374 10 123 456',
    phone2: '+374 99 123 456',
    emailUs: 'Напишите нам',
    emailText: 'info@agrotech.am',
    supportText: 'support@agrotech.am',
  },
  hy: {
    title: 'Կապ մեզ հետ',
    subtitle: 'Կապ հաստատեք Ագրոտեխի հետ',
    desc: 'Անկախ նրանից, դուք հարց ունեք մեր արտադրանքի վերաբերյալ, ագրոնոմիական խորհրդատվության կարիք ունեք, թե ցանկանում եք համագործակցության հնարավորություններ որոնել, մեր թիմը պատրաստ է պատասխանել ձեր բոլոր հարցերին:',
    name: 'Անուն Ազգանուն',
    email: 'Էլ. հասցե',
    phone: 'Հեռախոսահամար',
    subject: 'Թեմա',
    message: 'Ձեր Հաղորդագրությունը',
    send: 'Ուղարկել Տվյալները',
    addressTitle: 'Այցելեք մեր գրասենյակ',
    addressText: 'Ագրոտեխի պողոտա 123, Երևան, Հայաստան',
    callUs: 'Զանգահարեք մեզ',
    phone1: '+374 10 123 456',
    phone2: '+374 99 123 456',
    emailUs: 'Էլ. փոստ',
    emailText: 'info@agrotech.am',
    supportText: 'support@agrotech.am',
  },
}

export default async function ContactsPage({ params: paramsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise
  const t = translations[locale as keyof typeof translations] || translations.hy

  return (
    <div className="w-full ">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-teal-700 to-green-600 text-white py-20 px-6">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-green-50">{t.subtitle}</p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 max-w-7xl py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information & Map */}
          <div className="space-y-8 h-full flex flex-col">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t.subtitle}</h2>
              <p className="text-gray-600 mb-8">{t.desc}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
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

            {/* Map Placeholder */}
            <div className="h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner relative flex items-center justify-center group overflow-hidden border border-gray-100">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{
                  backgroundImage:
                    "url('https://maps.googleapis.com/maps/api/staticmap?center=Yerevan,Armenia&zoom=12&size=600x300&maptype=roadmap')",
                }}
              ></div>
              <div className="relative z-10 bg-white/90 px-6 py-3 rounded shadow-md text-sm font-semibold text-teal-700 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                View on Google Maps
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="+374 __ ___ ___"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    {t.subject}
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="products">Products Information</option>
                    <option value="services">Agronomic Consultations</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-teal-600 text-white font-semibold flex items-center justify-center py-4 rounded-lg hover:bg-teal-700 transition shadow-md hover:shadow-lg gap-2 mt-4 group"
              >
                {t.send}
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
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
