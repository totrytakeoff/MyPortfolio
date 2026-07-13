import type { ProjectMetric } from '../../types'

interface MetricCardProps {
  metric: ProjectMetric
  compact?: boolean
}

export function MetricCard({ metric, compact = false }: MetricCardProps) {
  return (
    <div className={`h-full bg-surface/65 ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className={`font-mono font-medium tabular-nums text-accent ${compact ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
          {metric.value}
        </span>
        <span className="font-mono text-[10px] text-text-muted">{metric.unit}</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-text-dim">{metric.description}</p>
    </div>
  )
}
