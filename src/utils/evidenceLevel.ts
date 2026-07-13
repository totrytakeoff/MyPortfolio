import type { EvidenceLevel } from '../types'

interface EvidenceLevelMeta {
  label: string
  description: string
  className: string
}

const evidenceLevelMeta: Record<EvidenceLevel, EvidenceLevelMeta> = {
  A: {
    label: 'A',
    description: '外部验证',
    className: 'border-status-green/40 bg-status-green-dim/40 text-status-green',
  },
  B: {
    label: 'B',
    description: '仓库与工程记录验证',
    className: 'border-accent/40 bg-accent-dim/40 text-accent',
  },
  C: {
    label: 'C',
    description: '公开材料待补',
    className: 'border-status-amber/40 bg-status-amber-dim/40 text-status-amber',
  },
  D: {
    label: 'D',
    description: '路线阶段',
    className: 'border-border bg-surface-2 text-text-dim',
  },
}

export function getEvidenceLevelMeta(level: EvidenceLevel): EvidenceLevelMeta {
  return evidenceLevelMeta[level]
}
