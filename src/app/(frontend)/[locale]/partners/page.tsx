import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/components/Media'

type Args = {
  params: Promise<{
    locale?: string
  }>
}

const translations = {
  en: {
    heroTitle: 'Our Partners',
    heroSub: 'Building strong relationships for sustainable agricultural success',
    growingTitle: 'Growing Together',
    growingSub1:
      'At AGROTECH, we believe in the power of collaboration. Our partnerships with leading organizations, research institutions, and distributors enable us to deliver innovative solutions and expand our global reach.',
    growingSub2:
      "Together, we're shaping the future of sustainable agriculture and making a positive impact on communities worldwide.",
    noPartners: 'No partners listed yet.',
    visitWebsite: 'Visit Website',
  },
  ru: {
    heroTitle: 'Наши партнеры',
    heroSub: 'Построение прочных отношений для устойчивого успеха в сельском хозяйстве',
    growingTitle: 'Растем вместе',
    growingSub1:
      'В AGROTECH мы верим в силу сотрудничества. Наше партнерство с ведущими организациями, исследовательскими институтами и дистрибьюторами позволяет нам предлагать инновационные решения и расширять наше глобальное присутствие.',
    growingSub2:
      'Вместе мы формируем будущее устойчивого сельского хозяйства и оказываем положительное влияние на сообщества по всему миру.',
    noPartners: 'Партнеры пока не указаны.',
    visitWebsite: 'Посетить сайт',
  },
  hy: {
    heroTitle: 'Մեր Գործընկերները',
    heroSub: 'Ամուր հարաբերությունների կառուցում կայուն գյուղատնտեսական հաջողության համար',
    growingTitle: 'Աճում ենք միասին',
    growingSub1:
      'AGROTECH-ում մենք հավատում ենք համագործակցության ուժին: Առաջատար կազմակերպությունների, հետազոտական ինստիտուտների և դիստրիբյուտորների հետ մեր գործընկերությունը թույլ է տալիս մեզ տրամադրել նորարարական լուծումներ:',
    growingSub2: 'Միասին մենք կերտում ենք կայուն գյուղատնտեսության ապագան:',
    noPartners: 'Դեռևս գործընկերներ չկան:',
    visitWebsite: 'Այցելել կայք',
  },
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const partnersReq = await payload.find({
    collection: 'partners',
    locale: locale as any,
    limit: 100,
  })

  const partners = partnersReq.docs
  const t = translations[locale as keyof typeof translations] || translations.hy

  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-teal-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-xl text-green-50">{t.heroSub}</p>
        </div>
      </section>

      {/* Partnership Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t.growingTitle}</h2>
            <p className="text-gray-600 text-lg mb-4">{t.growingSub1}</p>
            <p className="text-gray-600 text-lg">{t.growingSub2}</p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.length === 0 ? (
              <p className="text-gray-600 col-span-3">{t.noPartners}</p>
            ) : (
              partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                  <div className="h-32 w-full flex items-center justify-center mb-6">
                    {partner.logo && typeof partner.logo === 'object' ? (
                      <Media
                        resource={partner.logo}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 font-bold text-2xl">{partner.title}</div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{partner.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{partner.description}</p>
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 font-semibold hover:text-teal-700 w-full rounded border border-teal-600 py-2 transition hover:bg-teal-50"
                    >
                      {t.visitWebsite}
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
