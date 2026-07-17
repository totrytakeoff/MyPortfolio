import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import type { Project, ProjectCategory, ProjectNavigationState } from '../../types'
import {
  startProjectViewTransition,
  useProjectViewTransitionSlug,
} from '../../utils/projectViewTransition'
import { AnimatedMetricText } from '../ui/AnimatedMetricText'
import { EvidenceBadge } from './EvidenceBadge'
import { ProjectStatusBadge } from './ProjectStatusBadge'
import { ProjectVisual } from './ProjectVisual'

interface ProjectCardProps {
  project: Project
  index?: number
  archiveCategory?: ProjectCategory | 'all'
}

export function ProjectCard({
  project,
  index = 0,
  archiveCategory = 'all',
}: ProjectCardProps) {
  const navigate = useNavigate()
  const { motionEnabled } = useMotionPreference()
  const transitionSlug = useProjectViewTransitionSlug()
  const isTransitionTarget = transitionSlug === project.slug
  const technologies = project.stack
    .flatMap((group) => group.items)
    .filter((item, index, items) => items.indexOf(item) === index)
    .slice(0, 5)
  const target = `/projects/${project.slug}`

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) {
      return
    }

    event.preventDefault()
    const state: ProjectNavigationState = {
      archive: {
        category: archiveCategory,
        scrollY: window.scrollY,
      },
    }

    startProjectViewTransition(
      project.slug,
      () => navigate(target, { state }),
      motionEnabled,
    )
  }

  return (
    <Link
      to={target}
      state={{ archive: { category: archiveCategory, scrollY: window.scrollY } } satisfies ProjectNavigationState}
      onClick={handleNavigation}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
      aria-label={`查看 ${project.title} 项目详情`}
    >
      <motion.article
        className="relative flex h-full flex-col overflow-hidden border border-border bg-surface/55 transition-colors duration-200 group-hover:border-border-hover group-hover:bg-surface"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: (index % 2) * 0.055, ease: 'easeOut' }}
      >
        <span
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
          aria-hidden="true"
        />
        <div
          className="aspect-[16/10] w-full border-b border-border transition-transform duration-300 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"
          style={{ viewTransitionName: isTransitionTarget ? 'project-cover' : 'none' }}
        >
          <ProjectVisual
            media={project.cover}
            className="h-full w-full"
            imageClassName="transition-transform duration-500 group-hover:scale-[1.014]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <ProjectStatusBadge status={project.status} />
            <EvidenceBadge level={project.evidence.level} />
            <span className="ml-auto font-mono text-[10px] text-text-dim">{project.period}</span>
          </div>

          <h2
            className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
            style={{ viewTransitionName: isTransitionTarget ? 'project-title' : 'none' }}
          >
            {project.title}
          </h2>
          <p className="mt-2 text-sm font-medium text-accent">{project.subtitle}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-text-muted">{project.summary}</p>

          <div className="relative mt-6">
            <span
              className="pointer-events-none absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-accent/65 transition-transform delay-75 duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              aria-hidden="true"
            />
            <dl className="grid grid-cols-2 border-y border-border/80">
              {project.metrics.slice(0, 2).map((metric, metricIndex) => (
                <div key={`${metric.value}-${metric.unit}`} className="py-3 pr-3 first:border-r first:border-border">
                  <dt className="font-mono text-lg text-accent">
                    <AnimatedMetricText
                      value={metric.value}
                      animationKey={`archive-${project.slug}-${metric.value}-${metric.unit}`}
                      delay={metricIndex * 0.06}
                    />
                  </dt>
                  <dd className="mt-1 line-clamp-2 text-[10px] leading-4 text-text-dim">
                    {metric.unit} · {metric.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

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
