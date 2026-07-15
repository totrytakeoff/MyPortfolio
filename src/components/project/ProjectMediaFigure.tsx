import { useState } from 'react'
import type { ProjectMedia } from '../../types'
import { ProjectMediaLightbox } from './ProjectMediaLightbox'
import { ProjectVisual } from './ProjectVisual'

interface ProjectMediaFigureProps {
  media: ProjectMedia
  items?: ProjectMedia[]
  itemIndex?: number
  figureClassName?: string
  visualClassName?: string
  imageClassName?: string
  captionClassName?: string
  loading?: 'eager' | 'lazy'
  sizes?: string
  objectPosition?: string
  fit?: ProjectMedia['fit']
  showCaption?: boolean
  onLightboxOpenChange?: (open: boolean) => void
}

export function ProjectMediaFigure({
  media,
  items,
  itemIndex = 0,
  figureClassName = '',
  visualClassName = '',
  imageClassName = '',
  captionClassName = '',
  loading = 'lazy',
  sizes,
  objectPosition,
  fit,
  showCaption = true,
  onLightboxOpenChange,
}: ProjectMediaFigureProps) {
  const collection = items && items.length > 0 ? items : [media]
  const safeItemIndex = Math.min(Math.max(itemIndex, 0), collection.length - 1)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const displayMedia = fit ? { ...media, fit } : media

  return (
    <>
      <figure className={figureClassName}>
        <button
          type="button"
          className="group relative block w-full cursor-zoom-in text-left outline-none focus-visible:ring-1 focus-visible:ring-accent/70 focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
          aria-label={`放大查看：${media.alt}`}
          onClick={() => {
            setActiveIndex(safeItemIndex)
            onLightboxOpenChange?.(true)
          }}
        >
          <ProjectVisual
            media={displayMedia}
            className={visualClassName}
            imageClassName={`transition-[filter,transform] duration-300 group-hover:brightness-[1.04] ${imageClassName}`}
            loading={loading}
            sizes={sizes}
            objectPosition={objectPosition}
            containPadding="none"
          />
        </button>
        {showCaption && media.caption ? (
          <figcaption className={`mt-3 text-xs leading-5 text-text-dim ${captionClassName}`}>
            {media.caption}
          </figcaption>
        ) : null}
      </figure>

      <ProjectMediaLightbox
        items={collection}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        onClose={() => {
          setActiveIndex(null)
          onLightboxOpenChange?.(false)
        }}
      />
    </>
  )
}
