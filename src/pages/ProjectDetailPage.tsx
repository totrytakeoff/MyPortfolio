import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Check,
  ExternalLink,
  FileText,
  Github,
  PackageCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EvidenceBadge } from '../components/project/EvidenceBadge'
import { MetricCard } from '../components/project/MetricCard'
import { ProjectStatusBadge } from '../components/project/ProjectStatusBadge'
import { ProjectVisual } from '../components/project/ProjectVisual'
import { RoadmapStrip } from '../components/project/RoadmapStrip'
import { TechBadge } from '../components/ui/TechBadge'
import { getProjectBySlug } from '../data/projects'
import type { LinkType } from '../types'
import { NotFoundPage } from './NotFoundPage'

const linkIcons: Record<LinkType, LucideIcon> = {
  repo: Github,
  pr: Github,
  benchmark: BarChart3,
  release: PackageCheck,
  demo: ExternalLink,
  doc: FileText,
  other: ExternalLink,
}

interface DetailSectionProps {
  index: string
  label: string
  title: string
  children: ReactNode
  tone?: 'default' | 'warning'
}

function DetailSection({ index, label, title, children, tone = 'default' }: DetailSectionProps) {
  return (
    <section className={`border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12 ${tone === 'warning' ? 'bg-status-amber-dim/10' : ''}`}>
      <div className="grid gap-6 lg:grid-cols-[120px_1fr]">
        <div>
          <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${tone === 'warning' ? 'text-status-amber' : 'text-accent'}`}>
            {index} / {label}
          </p>
        </div>
        <div className="max-w-reading">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{title}</h2>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!project) return <NotFoundPage />

  return (
    <article className="pt-16">
      <header className="border-b border-border">
        <div className="site-frame">
          <div className="frame-pad border-b border-border py-5">
            <Link to="/projects" className="text-link">
              <ArrowLeft size={15} aria-hidden="true" />
              返回项目档案
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1fr_330px]">
            <div className="frame-pad py-12 sm:py-16 lg:border-r lg:border-border lg:py-20">
              <div className="flex flex-wrap items-center gap-2">
                <ProjectStatusBadge status={project.status} />
                <EvidenceBadge level={project.evidence.level} />
                <span className="font-mono text-[10px] text-text-dim">{project.period}</span>
              </div>

              <h1 className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-xl font-medium leading-8 text-accent sm:text-2xl">
                {project.subtitle}
              </p>
              <p className="mt-6 max-w-3xl text-sm leading-8 text-text-muted sm:text-base">
                {project.summary}
              </p>
            </div>

            <dl className="divide-y divide-border bg-surface/35">
              <div className="px-6 py-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Role</dt>
                <dd className="mt-2 text-sm text-text-primary">{project.role}</dd>
              </div>
              <div className="px-6 py-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Evidence</dt>
                <dd className="mt-2 text-sm text-text-primary">{project.evidence.items.length} 条可核验记录</dd>
              </div>
              <div className="px-6 py-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Categories</dt>
                <dd className="mt-2 font-mono text-xs uppercase text-text-primary">{project.category.join(' / ')}</dd>
              </div>
            </dl>
          </div>

          <figure>
            <ProjectVisual
              media={project.cover}
              objectPosition="center"
              className="aspect-[16/8] max-h-[720px] w-full border-t border-border sm:aspect-[16/7]"
              loading="eager"
              sizes="(max-width: 1240px) 100vw, 1240px"
            />
            {project.cover.caption ? (
              <figcaption className="frame-pad border-t border-border py-3 font-mono text-[10px] leading-5 text-text-dim">
                {project.cover.caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </header>

      <div className="border-b border-border">
        <div className="site-frame grid lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-border bg-surface/25 lg:border-b-0 lg:border-r">
            <div className="frame-pad py-10 lg:sticky lg:top-16">
              <p className="eyebrow">Project record</p>

              {project.links.length > 0 ? (
                <div className="mt-6 divide-y divide-border border-y border-border">
                  {project.links.map((link) => {
                    const LinkIcon = linkIcons[link.type]
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex min-h-12 items-center justify-between gap-3 text-sm text-text-muted transition-colors hover:text-accent"
                      >
                        <span className="inline-flex items-center gap-2"><LinkIcon size={15} /> {link.label}</span>
                        <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={14} />
                      </a>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-6 border-y border-border py-4 text-xs leading-6 text-text-dim">
                  独立公开仓库链接待后续补充，当前证据以本地测试和真机记录为主。
                </p>
              )}

              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Core stack</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {project.stack
                    .flatMap((group) => group.items)
                    .filter((item, index, items) => items.indexOf(item) === index)
                    .slice(0, 10)
                    .map((item) => (
                      <li key={item}>
                        <TechBadge name={item} />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </aside>

          <div>
            <DetailSection index="01" label="Context" title="背景与问题">
              <p className="leading-8 text-text-muted">{project.background ?? project.summary}</p>
            </DetailSection>

            <DetailSection index="02" label="Contribution" title="方案与我的贡献">
              {project.solution ? <p className="leading-8 text-text-muted">{project.solution}</p> : null}
              <ul className={`${project.solution ? 'mt-7' : ''} divide-y divide-border border-y border-border`}>
                {project.highlights.map((highlight, index) => (
                  <li key={highlight} className="grid gap-3 py-4 text-sm leading-7 text-text-muted sm:grid-cols-[34px_1fr]">
                    <span className="font-display text-xl italic text-accent/70">{String(index + 1).padStart(2, '0')}</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection index="03" label="Evidence" title="结果与证据">
              {project.results ? <p className="leading-8 text-text-muted">{project.results}</p> : null}
              {project.metrics.length > 0 ? (
                <div className="mt-7 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <MetricCard key={`${metric.value}-${metric.unit}`} metric={metric} />
                  ))}
                </div>
              ) : null}
              <ul className="mt-7 divide-y divide-border border-y border-border">
                {project.evidence.items.map((item) => (
                  <li key={item} className="grid gap-3 py-3 text-sm leading-6 text-text-muted sm:grid-cols-[24px_1fr]">
                    <Check className="mt-1 text-status-green" size={14} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>

            {project.upstream ? (
              <DetailSection index="04" label="Upstream" title="上游与个人边界">
                <p className="border-l-2 border-accent pl-5 leading-8 text-text-muted">{project.upstream}</p>
              </DetailSection>
            ) : null}

            {project.boundaries && project.boundaries.length > 0 ? (
              <DetailSection index={project.upstream ? '05' : '04'} label="Scope" title="边界与说明" tone="warning">
                <ul className="divide-y divide-status-amber/15 border-y border-status-amber/25">
                  {project.boundaries.map((boundary) => (
                    <li key={boundary} className="py-4 text-sm leading-7 text-text-muted">{boundary}</li>
                  ))}
                </ul>
              </DetailSection>
            ) : null}

            <DetailSection index={project.upstream ? '06' : '05'} label="Stack" title="技术栈">
              <div className="divide-y divide-border border-y border-border">
                {project.stack.map((group) => (
                  <div key={group.domain} className="grid gap-3 py-4 sm:grid-cols-[140px_1fr]">
                    <h3 className="text-sm font-medium text-text-primary">{group.domain}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item}>
                          <TechBadge name={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </DetailSection>

            {project.roadmap && project.roadmap.length > 0 ? (
              <DetailSection index={project.upstream ? '07' : '06'} label="Roadmap" title="路线进展">
                <RoadmapStrip items={project.roadmap} />
              </DetailSection>
            ) : null}

            {project.gallery && project.gallery.length > 0 ? (
              <DetailSection index={project.upstream ? '08' : '07'} label="References" title="补充视觉材料">
                <div className="grid gap-5 sm:grid-cols-2">
                  {project.gallery.map((media) => (
                    <figure key={media.src}>
                      <ProjectVisual media={media} className="aspect-[4/3] border border-border" />
                      {media.caption ? <figcaption className="mt-3 text-xs leading-5 text-text-dim">{media.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </DetailSection>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
