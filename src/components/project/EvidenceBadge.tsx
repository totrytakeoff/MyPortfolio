import type { EvidenceLevel } from '../../types'
import { getEvidenceLevelMeta } from '../../utils/evidenceLevel'

interface EvidenceBadgeProps {
  level: EvidenceLevel
}

export function EvidenceBadge({ level }: EvidenceBadgeProps) {
  const meta = getEvidenceLevelMeta(level)

  return (
    <span
      className={`inline-flex items-center border px-2 py-1 font-mono text-[10px] ${meta.className}`}
      title={meta.description}
      aria-label={`证据等级 ${meta.label}：${meta.description}`}
    >
      [{meta.label}]
    </span>
  )
}
