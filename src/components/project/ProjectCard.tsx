import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import { EvidenceBadge } from './EvidenceBadge'
import { ProjectStatusBadge } from './ProjectStatusBadge'
import { ProjectVisual } from './ProjectVisual'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.stack
    .flatMap((group) => group.items)
    .filter((item, index, items) => items.indexOf(item) === index)
    .slice(0, 5)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
      aria-label={`查看 ${project.title} 项目详情`}
    >
      <motion.article
        className="flex h-full flex-col border border-border bg-surface/55 transition-colors duration-200 group-hover:border-border-hover group-hover:bg-surface"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <ProjectVisual
          media={project.cover}
          className="aspect-[16/10] w-full border-b border-border"
          imageClassName="transition-transform duration-500 group-hover:scale-[1.018]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <ProjectStatusBadge status={project.status} />
            <EvidenceBadge level={project.evidence.level} />
            <span className="ml-auto font-mono text-[10px] text-text-dim">{project.period}</span>
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-text-primary">
            {project.title}
          </h2>
          <p className="mt-2 text-sm font-medium text-accent">{project.subtitle}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-text-muted">{project.summary}</p>

          <dl className="mt-6 grid grid-cols-2 border-y border-border/80">
            {project.metrics.slice(0, 2).map((metric) => (
              <div key={`${metric.value}-${metric.unit}`} className="py-3 pr-3 first:border-r first:border-border">
                <dt className="font-mono text-lg text-accent">{metric.value}</dt>
                <dd className="mt-1 line-clamp-2 text-[10px] leading-4 text-text-dim">
                  {metric.unit} · {metric.description}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label="主要技术">
            {technologies.map((technology) => (
              <li key={technology} className="font-mono text-[10px] text-text-dim">
                {technology}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-4 pt-7">
            <span className="line-clamp-1 text-xs text-text-dim">{project.role}</span>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-text-primary transition-colors group-hover:text-accent">
              项目详情
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
