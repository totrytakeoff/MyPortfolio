import type { ProjectCategory } from '../../types'

export type ProjectFilterValue = ProjectCategory | 'all'

interface ProjectFilterProps {
  value: ProjectFilterValue
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

export function ProjectFilter({ value, onChange }: ProjectFilterProps) {
  return (
    <div
      className="mb-10 flex max-w-full overflow-x-auto border-y border-border sm:mb-12"
      role="group"
      aria-label="按方向筛选项目"
    >
      {filterOptions.map((option) => {
        const isActive = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            className={`min-h-12 shrink-0 border-r border-border px-5 text-sm transition-colors last:border-r-0 ${
              isActive
                ? 'bg-accent text-bg'
                : 'bg-surface/35 text-text-muted hover:bg-surface hover:text-text-primary'
            }`}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
