import React from 'react'
import Link from 'next/link'
import type { FinancialReportingBlock as FinancialReportingBlockProps } from '@/payload-types'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const ViewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
)

export const FinancialReportingBlockComponent: React.FC<
  FinancialReportingBlockProps & { locale?: string }
> = async ({
  heading,
  subheading,
  annualReports,
  quarterlyResults,
  investorRelations,
  locale = 'hy',
}) => {
  const tr = await getSiteTranslations(locale)
  const t = {
    annualReports: tr.financialReporting?.annualReports ?? 'Annual Reports',
    quarterlyResults: tr.financialReporting?.quarterlyResults ?? 'Quarterly Results',
    download: tr.financialReporting?.download ?? 'Download',
    view: tr.financialReporting?.view ?? 'View',
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
            )}
            {subheading && <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subheading}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Annual Reports */}
          {annualReports && annualReports.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t.annualReports}</h3>
              <div className="space-y-3">
                {annualReports.map((report, i) => {
                  const fileUrl = typeof report.file === 'object' ? report.file?.url : null
                  return (
                    <div key={report.id ?? i} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{report.year}</span>
                      {fileUrl && (
                        <a
                          href={fileUrl}
                          className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-teal-700 transition"
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <DownloadIcon />
                          {t.download}
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Quarterly Results */}
          {quarterlyResults && quarterlyResults.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t.quarterlyResults}</h3>
              <div className="space-y-3">
                {quarterlyResults.map((result, i) => {
                  const fileUrl =
                    (result as any).file && typeof (result as any).file === 'object'
                      ? (result as any).file?.url
                      : null
                  const linkUrl = fileUrl ?? (result as any).url ?? null

                  return (
                    <div key={result.id ?? i} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{result.quarter}</span>
                      {fileUrl ? (
                        <a
                          href={fileUrl}
                          className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-teal-700 transition"
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <DownloadIcon />
                          {t.download}
                        </a>
                      ) : linkUrl ? (
                        <Link
                          href={linkUrl}
                          className="inline-flex items-center gap-2 border border-teal-600 text-teal-950 px-4 py-2 rounded text-sm font-semibold hover:bg-teal-50 transition"
                        >
                          {t.view}
                          <ViewIcon />
                        </Link>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Investor Relations */}
        {investorRelations?.url && (
          <div className="mt-8 text-center">
            <Link
              href={investorRelations.url}
              className="inline-flex items-center gap-2 text-teal-950 font-semibold hover:underline"
            >
              {investorRelations.text || 'Investor Relations'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
