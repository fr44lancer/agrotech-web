import Link from "next/link"

type EventDoc = {
  id: string
  title: string
  slug: string
  date: string
  location: string
  description?: string
  image?: any
  categories?: any[]
}

type T = {
  upcomingTitle: string
  pastTitle: string
  noUpcoming: string
  noPast: string
  noResults: string
  registerNow: string
  viewHighlights: string
  eventLabel: string
  allEvents: string
  upcoming: string
  past: string
  allCategories: string
}

export default function EventCard({ event, locale, t, cardType}: { event: EventDoc; locale: string; t: T, cardType: string }) {
  const imageUrl = typeof event.image === 'object' && event.image ? event.image.url : null
  const dateStr = new Date(event.date as string).toLocaleDateString(
    locale === 'hy' ? 'hy-AM' : locale, 
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) 
  const shortDate =  new Date(event.date).toLocaleDateString(
    locale === 'hy' ? 'hy-AM' : locale, 
    {month: 'short'})

  const cats = (event.categories ?? []).filter((c: any) => typeof c === 'object' && c?.title)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-72 lg:w-80 shrink-0 h-52 md:h-auto bg-gradient-to-br from-teal-700 to-green-200 overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Date badge overlay */}
          <div className="absolute top-4 left-4 bg-teal-700 text-white rounded-lg px-3 py-2 text-center shadow-lg">
            <div className="text-xl font-bold leading-none">{new Date(event.date).getDate()}</div>
            <div className="text-xs uppercase tracking-wide mt-0.5 opacity-90">
              {shortDate}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {cats.map((c: any) => (
              <span
                key={c.id}
                className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full"
              >
                {c.title}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{event.title}</h3>

          {event.description && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{event.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateStr}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-teal-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {event.location}
              </span>
            )}
          </div>

        {cardType === "upcoming" && (
          <Link
            href={`/${locale}/events/${event.slug}`}
            className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-teal-800 transition self-start"
          >
            {t.registerNow}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        )}
        {cardType === "past" && (
          <Link
            href={`/${locale}/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-teal-600 py-2.5 rounded-xl font-semibold text-sm hover:text-teal-700 transition self-start"
          >
            {t.viewHighlights}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        )}
        </div>
      </div>
    </div>
   )
}