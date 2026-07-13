import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[190px_1fr_auto] lg:items-end">
      <p className="eyebrow lg:self-start">{eyebrow}</p>
      <div className="max-w-3xl">
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="lg:justify-self-end">{action}</div> : null}
    </div>
  )
}
