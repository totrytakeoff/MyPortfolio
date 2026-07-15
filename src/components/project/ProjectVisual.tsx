import type { ProjectMedia } from '../../types'
import { getAssetUrl } from '../../utils/assets'

interface ProjectVisualProps {
  media: ProjectMedia
  className?: string
  imageClassName?: string
  loading?: 'eager' | 'lazy'
  sizes?: string
  objectPosition?: string
  containPadding?: 'default' | 'compact' | 'none'
}

export function ProjectVisual({
  media,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  sizes,
  objectPosition,
  containPadding = 'default',
}: ProjectVisualProps) {
  const containPaddingClass = {
    default: 'p-6 sm:p-10',
    compact: 'p-3 sm:p-5',
    none: '',
  }[containPadding]

  return (
    <div className={`image-stage ${className}`}>
      <img
        src={getAssetUrl(media.src)}
        alt={media.alt}
        loading={loading}
        decoding="async"
        sizes={sizes}
        className={`h-full w-full ${media.fit === 'contain' ? `object-contain ${containPaddingClass}` : 'object-cover'} ${imageClassName}`}
        style={{ objectPosition: objectPosition ?? media.position ?? 'center' }}
      />
    </div>
  )
}
