import { AnimatePresence, motion } from 'framer-motion'
import type { ProjectCategory } from '../../types'

export type ProjectFilterValue = ProjectCategory | 'all'

interface ProjectFilterProps {
  value: ProjectFilterValue
  resultCount: number
  onChange: (value: ProjectFilterValue) => void
}

const filterOptions: ReadonlyArray<{
  value: ProjectFilterValue
  label: string
}> = [
  { value: 'all', label: '全部项目' },
  { value: 'systems', label: '系统 / 后端' },
  { value: 'ai', label: 'AI' },
  { value: 'embedded', label: '嵌入式' },
  { value: 'robotics', label: '机器人' },
]

export function ProjectFilter({ value, resultCount, onChange }: ProjectFilterProps) {
  return (
    <div
      className="mb-10 grid max-w-full border-y border-border sm:mb-12 sm:grid-cols-[minmax(0,1fr)_auto]"
      role="group"
      aria-label="按方向筛选项目"
    >
      <div className="flex max-w-full overflow-x-auto">
        {filterOptions.map((option) => {
          const isActive = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              className={`relative min-h-12 shrink-0 overflow-hidden border-r border-border px-5 text-sm transition-colors ${
                isActive ? 'text-bg' : 'bg-surface/35 text-text-muted hover:bg-surface hover:text-text-primary'
              }`}
              aria-pressed={isActive}
              onClick={() => onChange(option.value)}
            >
              {isActive ? (
                <motion.span
                  layoutId="project-filter-active"
                  className="absolute inset-0 bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative z-10">{option.label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex min-h-12 items-center justify-between gap-4 border-t border-border bg-bg px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim sm:justify-end sm:border-l sm:border-t-0">
        <span>Visible</span>
        <span className="inline-grid min-w-8 text-right text-accent" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${value}-${resultCount}`}
              className="col-start-1 row-start-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {String(resultCount).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  )
}
