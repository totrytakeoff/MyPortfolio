import type { ProjectStatus } from '../types'

interface ProjectStatusMeta {
  label: string
  className: string
}

const projectStatusMeta: Record<ProjectStatus, ProjectStatusMeta> = {
  verified: {
    label: '已验证',
    className: 'border-status-green/40 bg-status-green-dim/30 text-status-green',
  },
  'mvp-verified': {
    label: '实机 MVP 已验证',
    className: 'border-status-green/40 bg-status-green-dim/30 text-status-green',
  },
  release: {
    label: '公开 Release',
    className: 'border-status-green/40 bg-status-green-dim/30 text-status-green',
  },
  'in-progress': {
    label: '进行中',
    className: 'border-status-amber/40 bg-status-amber-dim/30 text-status-amber',
  },
  iterating: {
    label: '持续迭代',
    className: 'border-status-amber/40 bg-status-amber-dim/30 text-status-amber',
  },
  paused: {
    label: 'MVP 已暂停',
    className: 'border-border-hover bg-surface text-text-muted',
  },
}

export function getProjectStatusMeta(status: ProjectStatus): ProjectStatusMeta {
  return projectStatusMeta[status]
}
