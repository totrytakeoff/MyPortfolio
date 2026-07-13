import type { ProjectMedia } from '../../types'
import { getAssetUrl } from '../../utils/assets'

interface ProjectVisualProps {
  media: ProjectMedia
  className?: string
  imageClassName?: string
  loading?: 'eager' | 'lazy'
  sizes?: string
  objectPosition?: string
}

export function ProjectVisual({
  media,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  sizes,
  objectPosition,
}: ProjectVisualProps) {
  return (
    <div className={`image-stage ${className}`}>
      <img
        src={getAssetUrl(media.src)}
        alt={media.alt}
        loading={loading}
        decoding="async"
        sizes={sizes}
        className={`h-full w-full ${media.fit === 'contain' ? 'object-contain p-6 sm:p-10' : 'object-cover'} ${imageClassName}`}
        style={{ objectPosition: objectPosition ?? media.position ?? 'center' }}
      />
    </div>
  )
}
