import type { ProjectMetric } from '../../types'
import { AnimatedMetricText } from '../ui/AnimatedMetricText'

interface MetricCardProps {
  metric: ProjectMetric
  compact?: boolean
  animationKey?: string
  animationDelay?: number
}

export function MetricCard({
  metric,
  compact = false,
  animationKey = `${metric.value}-${metric.unit}`,
  animationDelay = 0,
}: MetricCardProps) {
  return (
    <div className={`h-full bg-surface/65 ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className={`font-mono font-medium tabular-nums text-accent ${compact ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
          <AnimatedMetricText
            value={metric.value}
            animationKey={animationKey}
            delay={animationDelay}
          />
        </span>
        <span className="font-mono text-[10px] text-text-muted">{metric.unit}</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-text-dim">{metric.description}</p>
    </div>
  )
}
