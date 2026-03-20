import React from 'react'
import Link from 'next/link'
import type { FinancialReportingBlock as FinancialReportingBlockProps } from '@/payload-types'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const ViewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const FileActions = ({ url, downloadLabel, viewLabel }: { url: string; downloadLabel: string; viewLabel: string }) => (
  <div className="flex items-center gap-2">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={viewLabel}
      className="w-8 h-8 inline-flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-teal-500 hover:text-teal-600 transition"
    >
      <ViewIcon />
    </a>
    <a
      href={url}
      download
      target="_blank"
      rel="noopener noreferrer"
      title={downloadLabel}
      className="w-8 h-8 inline-flex items-center justify-center rounded bg-teal-600 text-white hover:bg-teal-700 transition"
    >
      <DownloadIcon />
    </a>
  </div>
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
                        <FileActions url={fileUrl} downloadLabel={t.download} viewLabel={t.view} />
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
                        <FileActions url={fileUrl} downloadLabel={t.download} viewLabel={t.view} />
                      ) : linkUrl ? (
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={t.view}
                          className="w-8 h-8 inline-flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-teal-500 hover:text-teal-600 transition"
                        >
                          <ViewIcon />
                        </a>
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
