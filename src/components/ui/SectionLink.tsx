import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMotionPreference } from '../../hooks/useMotionPreference'

interface SectionLinkProps {
  sectionId: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}

export function SectionLink({
  sectionId,
  className,
  children,
  onNavigate,
}: SectionLinkProps) {
  const location = useLocation()
  const { motionEnabled } = useMotionPreference()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.()

    if (location.pathname !== '/') return

    event.preventDefault()
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: motionEnabled ? 'smooth' : 'auto',
    })
  }

  return (
    <Link
      to="/"
      state={{ scrollTo: sectionId }}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
