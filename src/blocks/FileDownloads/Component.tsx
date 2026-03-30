'use client'
import React from 'react'
import { Row, Col } from 'antd'
import type { FileDownloadsBlock as FileDownloadsBlockProps } from '@/payload-types'

const COL_SPAN: Record<string, number> = {
  '1': 24,
  '2': 12,
  '3': 8,
}

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
)

const ViewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const FileActions = ({ url }: { url: string }) => (
  <div className="flex items-center gap-2 shrink-0">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title="View"
      className="w-8 h-8 inline-flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-teal-500 hover:text-teal-600 transition"
    >
      <ViewIcon />
    </a>
    <a
      href={url}
      download
      target="_blank"
      rel="noopener noreferrer"
      title="Download"
      className="w-8 h-8 inline-flex items-center justify-center rounded bg-teal-600 text-white hover:bg-teal-700 transition"
    >
      <DownloadIcon />
    </a>
  </div>
)

export const FileDownloadsBlockComponent: React.FC<FileDownloadsBlockProps> = ({
  heading,
  subheading,
  columns = '2',
  columnList,
}) => {
  const colSpan = COL_SPAN[columns ?? '2'] ?? 12

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subheading}</p>
            )}
          </div>
        )}

        <Row gutter={[24, 24]} style={{ alignItems: 'stretch' }}>
          {(columnList ?? []).map((col, colIdx) => {
            const items = col.items ?? []
            return (
              <Col key={col.id ?? colIdx} xs={24} sm={colSpan} style={{ display: 'flex' }}>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col w-full">
                  {col.title && (
                    <h3 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                      {col.title}
                    </h3>
                  )}
                  <div className="flex flex-col gap-3 flex-1">
                    {items.map((item, itemIdx) => {
                      const fileUrl =
                        item.file && typeof item.file === 'object'
                          ? (item.file as any).url
                          : null
                      const resolvedUrl = fileUrl ?? item.url ?? null

                      return (
                        <div
                          key={item.id ?? itemIdx}
                          className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0"
                        >
                          <span className="text-gray-700 text-sm leading-snug">{item.label}</span>
                          {resolvedUrl && <FileActions url={resolvedUrl} />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </section>
  )
}
