import { motion } from 'framer-motion'
import { CheckCircle2, CircleDotDashed } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ProjectAudit, ProjectAuditStatus } from '../../types'
import { sectionItemVariants, sectionRevealVariants } from '../../utils/motion'
import { ProjectMediaFigure } from './ProjectMediaFigure'

interface ProjectAuditPanelProps {
  audit: ProjectAudit
}

const statusPresentation: Record<
  ProjectAuditStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  passed: {
    label: '通过',
    icon: CheckCircle2,
    className: 'text-status-green',
  },
  qualified: {
    label: '附条件',
    icon: CircleDotDashed,
    className: 'text-status-amber',
  },
}

export function ProjectAuditPanel({ audit }: ProjectAuditPanelProps) {
  return (
    <div>
      <motion.div
        className="grid gap-px bg-border sm:grid-cols-[150px_1fr]"
        variants={sectionRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-72px' }}
      >
        <motion.div className="bg-surface/60 px-5 py-5" variants={sectionItemVariants}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Audit date</p>
          <p className="mt-2 font-mono text-sm text-accent">{audit.date}</p>
        </motion.div>
        <motion.div className="bg-surface/30 px-5 py-5" variants={sectionItemVariants}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Environment</p>
          <p className="mt-2 text-xs leading-6 text-text-muted">{audit.environment}</p>
        </motion.div>
      </motion.div>

      <p className="mt-7 leading-8 text-text-muted">{audit.summary}</p>

      <motion.div
        className="mt-8 border-t border-border"
        variants={sectionRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-72px' }}
      >
        {audit.checks.map((check) => {
          const presentation = statusPresentation[check.status]
          const StatusIcon = presentation.icon

          return (
            <motion.article
              key={check.title}
              className="grid gap-4 border-b border-border py-5 sm:grid-cols-[120px_1fr]"
              variants={sectionItemVariants}
            >
              <div className={`inline-flex items-start gap-2 font-mono text-[10px] uppercase tracking-[0.14em] ${presentation.className}`}>
                <motion.span
                  className="mt-px inline-flex shrink-0"
                  variants={{
                    hidden: { opacity: 0, scale: 0.72 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.32, ease: 'easeOut' },
                    },
                  }}
                >
                  <StatusIcon size={14} aria-hidden="true" />
                </motion.span>
                {presentation.label}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">{check.title}</h3>
                <p className="mt-2 text-sm leading-7 text-text-muted">{check.result}</p>
                {check.detail ? (
                  <p className="mt-2 text-xs leading-6 text-text-dim">{check.detail}</p>
                ) : null}
              </div>
            </motion.article>
          )
        })}
      </motion.div>

      {audit.media && audit.media.length > 0 ? (
        <motion.div
          className="mt-9 space-y-7"
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-72px' }}
        >
          {audit.media.map((media) => (
            <motion.div key={media.src} variants={sectionItemVariants}>
              <ProjectMediaFigure
                media={media}
                visualClassName="aspect-[16/10] border border-border sm:aspect-[16/9]"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </div>
  )
}
