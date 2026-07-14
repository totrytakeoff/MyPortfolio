import { getAssetUrl } from '../../utils/assets'

type SectionBackdropVariant = 'skills' | 'opensource' | 'resumes'

interface SectionBackdropProps {
  variant: SectionBackdropVariant
}

export function SectionBackdrop({ variant }: SectionBackdropProps) {
  return (
    <div className={`section-backdrop section-backdrop-${variant}`} aria-hidden="true">
      <img
        src={getAssetUrl('takeoff.svg')}
        alt=""
        className="section-backdrop-mark"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
