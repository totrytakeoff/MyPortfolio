import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

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

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.()

    if (location.pathname !== '/') return

    event.preventDefault()
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
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
