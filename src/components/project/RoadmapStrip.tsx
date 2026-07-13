import { ArrowDown, ArrowRight, Check } from 'lucide-react'
import type { RoadmapItem } from '../../types'

interface RoadmapStripProps {
  items: RoadmapItem[]
}

const roadmapClassNames: Record<RoadmapItem['status'], string> = {
  done: 'border-accent/45 bg-accent-dim/40 text-accent',
  current: 'border-accent bg-surface text-accent',
  planned: 'border-border bg-surface/45 text-text-dim',
}

export function RoadmapStrip({ items }: RoadmapStripProps) {
  return (
    <ol className="flex flex-col gap-2 lg:flex-row lg:items-center" aria-label="项目路线进展">
      {items.map((item, index) => (
        <li key={item.label} className="contents">
          <div className={`flex min-h-12 flex-1 items-center justify-center gap-2 border px-3 py-2 text-center text-xs ${roadmapClassNames[item.status]}`}>
            {item.status === 'done' ? <Check aria-hidden="true" size={14} /> : null}
            {item.status === 'current' ? <ArrowRight aria-hidden="true" size={14} /> : null}
            <span>{item.label}</span>
            <span className="sr-only">
              {item.status === 'done' ? '已完成' : item.status === 'current' ? '当前阶段' : '后续规划'}
            </span>
          </div>
          {index < items.length - 1 ? (
            <span className="flex justify-center text-text-dim" aria-hidden="true">
              <ArrowDown className="lg:hidden" size={14} />
              <ArrowRight className="hidden lg:block" size={14} />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
