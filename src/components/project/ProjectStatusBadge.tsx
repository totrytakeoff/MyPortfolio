import type { ProjectStatus } from '../../types'
import { getProjectStatusMeta } from '../../utils/projectStatus'

interface ProjectStatusBadgeProps {
  status: ProjectStatus
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const meta = getProjectStatusMeta(status)

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-mono text-[10px] ${meta.className}`}
    >
      {meta.label}
    </span>
  )
}
