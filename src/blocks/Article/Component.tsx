import React from 'react'
import { Col, Row } from 'antd'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { ArticleBlock as ArticleBlockType } from '@/payload-types'

type Props = ArticleBlockType & { locale?: string }

const imgSpanMap: Record<string, number> = {
  '25': 6,
  '33': 8,
  '40': 10,
  '50': 12,
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  )
  return match?.[1] ?? null
}

const TitleTag = ({ type, children }: { type: string; children: React.ReactNode }) => {
  const base = 'font-bold text-gray-900 mb-4'
  const sizes: Record<string, string> = {
    h1: 'text-4xl md:text-5xl',
    h2: 'text-3xl md:text-4xl',
    h3: 'text-2xl md:text-3xl',
  }
  const className = `${base} ${sizes[type] ?? sizes.h2}`
  if (type === 'h1') return <h1 className={className}>{children}</h1>
  if (type === 'h3') return <h3 className={className}>{children}</h3>
  return <h2 className={className}>{children}</h2>
}

export const ArticleBlockComponent: React.FC<Props> = ({
  title,
  titleType = 'h2',
  content,
  mediaType = 'image',
  image,
  youtubeUrl,
  imageAlignment = 'right',
  imageColPercent = '40',
}) => {
  const imgSpan = imgSpanMap[imageColPercent ?? '40'] ?? 10
  const textSpan = 24 - imgSpan

  const hasImage = mediaType === 'image' && Boolean(image)
  const hasVideo = mediaType === 'video' && Boolean(youtubeUrl)
  const hasMedia = hasImage || hasVideo

  const textCol = (
    <Col xs={24} md={hasMedia ? textSpan : 24}>
      <div className="prose prose-gray max-w-none">
        {title && <TitleTag type={titleType ?? 'h2'}>{title}</TitleTag>}
        {content && <RichText data={content} enableGutter={false} />}
      </div>
    </Col>
  )

  let mediaCol: React.ReactNode = null

  if (hasImage) {
    mediaCol = (
      <Col xs={24} md={imgSpan}>
        <div className="relative w-full rounded-xl overflow-hidden">
          <Media resource={image} imgClassName="w-full h-auto object-cover rounded-xl" />
        </div>
      </Col>
    )
  } else if (hasVideo && youtubeUrl) {
    const videoId = getYouTubeId(youtubeUrl)
    if (videoId) {
      mediaCol = (
        <Col xs={24} md={imgSpan}>
          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title ?? 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-xl"
            />
          </div>
        </Col>
      )
    }
  }

  return (
    <div className="py-12 px-6">
      <div className="container mx-auto">
        <Row gutter={[48, 32]} align="middle">
          {imageAlignment === 'left' ? (
            <>
              {mediaCol}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {mediaCol}
            </>
          )}
        </Row>
      </div>
    </div>
  )
}
