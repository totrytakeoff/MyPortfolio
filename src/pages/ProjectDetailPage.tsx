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
import { ProjectArchitecturePanel } from '../components/project/ProjectArchitecturePanel'
import { ProjectAuditPanel } from '../components/project/ProjectAuditPanel'
import { ProjectHeroMediaRail } from '../components/project/ProjectHeroMediaRail'
import { ProjectMediaFigure } from '../components/project/ProjectMediaFigure'
import { ProjectStatusBadge } from '../components/project/ProjectStatusBadge'
import { RoadmapStrip } from '../components/project/RoadmapStrip'
import { TechBadge } from '../components/ui/TechBadge'
import { getProjectBySlug } from '../data/projects'
import type { LinkType, ProjectCategory } from '../types'
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

const categoryLabels: Record<ProjectCategory, string> = {
  systems: 'Systems / Backend',
  ai: 'AI',
  embedded: 'Embedded',
  robotics: 'Robotics',
}

interface DetailSectionProps {
  index: string
  label: string
  title: string
  children: ReactNode
  tone?: 'default' | 'warning'
}

function DetailSection({
  index,
  label,
  title,
  children,
  tone = 'default',
}: DetailSectionProps) {
  return (
    <section className={`border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12 ${tone === 'warning' ? 'bg-status-amber-dim/10' : ''}`}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[120px_minmax(0,1fr)]">
        <div>
          <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${tone === 'warning' ? 'text-status-amber' : 'text-accent'}`}>
            {index} / {label}
          </p>
        </div>
        <div className="min-w-0 w-full max-w-reading">
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

  const sectionKeys = [
    'context',
    ...(project.architecture ? ['architecture'] : []),
    'contribution',
    ...(project.collaboration ? ['collaboration'] : []),
    'evidence',
    ...(project.audit ? ['audit'] : []),
    ...(project.research ? ['research'] : []),
    ...(project.upstream ? ['upstream'] : []),
    ...(project.boundaries && project.boundaries.length > 0 ? ['scope'] : []),
    'stack',
    ...(project.roadmap && project.roadmap.length > 0 ? ['roadmap'] : []),
  ]
  const sectionIndex = (key: string) => String(sectionKeys.indexOf(key) + 1).padStart(2, '0')
  const heroMedia = [project.cover, ...(project.showcaseMedia ?? [])]
    .filter((media, index, items) => items.findIndex((item) => item.src === media.src) === index)

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

          <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_330px]">
            <div className="frame-pad py-10 sm:py-12 lg:border-r lg:border-border lg:py-14">
              <div className="flex flex-wrap items-center gap-2">
                <ProjectStatusBadge status={project.status} />
                <EvidenceBadge level={project.evidence.level} />
                <span className="font-mono text-[10px] text-text-dim">{project.period}</span>
              </div>

              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-xl font-medium leading-8 text-accent sm:text-2xl">
                {project.subtitle}
              </p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-text-muted sm:text-base sm:leading-8">
                {project.summary}
              </p>
            </div>

            <dl className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)] border-t border-border bg-surface/35 sm:grid-cols-3 lg:grid-cols-1 lg:border-t-0">
              <div className="min-w-0 border-r border-border px-4 py-4 sm:px-6 lg:border-b lg:border-r-0 lg:py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Role</dt>
                <dd className="mt-2 text-sm text-text-primary">{project.role}</dd>
              </div>
              <div className="min-w-0 border-r border-border px-4 py-4 sm:px-6 lg:border-b lg:border-r-0 lg:py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Evidence</dt>
                <dd className="mt-2 text-sm text-text-primary">{project.evidence.items.length} 条可核验记录</dd>
              </div>
              <div className="min-w-0 px-4 py-4 sm:px-6 lg:py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">Category</dt>
                <dd className="mt-2 font-mono text-xs uppercase text-text-primary">
                  {project.category.map((category) => categoryLabels[category]).join(' · ')}
                </dd>
              </div>
            </dl>
          </div>

          <ProjectHeroMediaRail
            items={heroMedia}
            label={`${project.title} 项目画面`}
            className="border-t border-border"
            sizes="(max-width: 640px) 86vw, (max-width: 1240px) 72vw, 880px"
          />
        </div>
      </header>

      <div className="border-b border-border">
        <div className="site-frame grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="min-w-0 border-b border-border bg-surface/25 lg:border-b-0 lg:border-r">
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

          <div className="min-w-0">
            <DetailSection index={sectionIndex('context')} label="Context" title="背景与问题">
              <p className="leading-8 text-text-muted">{project.background ?? project.summary}</p>
            </DetailSection>

            {project.architecture ? (
              <DetailSection
                index={sectionIndex('architecture')}
                label="Architecture"
                title={project.architecture.title}
              >
                <ProjectArchitecturePanel architecture={project.architecture} />
              </DetailSection>
            ) : null}

            <DetailSection index={sectionIndex('contribution')} label="Contribution" title="方案与我的贡献">
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

            {project.collaboration ? (
              <DetailSection
                index={sectionIndex('collaboration')}
                label="Collaboration"
                title="团队协作与个人职责"
              >
                <p className="border-l-2 border-accent pl-5 leading-8 text-text-muted">
                  {project.collaboration}
                </p>
              </DetailSection>
            ) : null}

            <DetailSection index={sectionIndex('evidence')} label="Evidence" title="结果与证据">
              {project.results ? <p className="leading-8 text-text-muted">{project.results}</p> : null}
              {project.metrics.length > 0 ? (
                <div className="mt-7 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <MetricCard key={`${metric.value}-${metric.unit}`} metric={metric} />
                  ))}
                </div>
              ) : null}
              {project.evidenceMedia && project.evidenceMedia.length > 0 ? (
                <div className="mt-8 space-y-7">
                  {project.evidenceMedia.map((media) => (
                    <ProjectMediaFigure
                      key={media.src}
                      media={media}
                      visualClassName="aspect-[16/10] border border-border sm:aspect-[16/9]"
                      sizes="(max-width: 1024px) 100vw, 720px"
                    />
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

            {project.audit ? (
              <DetailSection index={sectionIndex('audit')} label="Operation audit" title={project.audit.title}>
                <ProjectAuditPanel audit={project.audit} />
              </DetailSection>
            ) : null}

            {project.research ? (
              <DetailSection index={sectionIndex('research')} label="Research track" title="研究路线">
                <div className="border border-border bg-surface/25">
                  <div className="grid gap-px bg-border sm:grid-cols-[150px_1fr]">
                    <div className="bg-surface/70 px-5 py-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                        Status
                      </p>
                      <p className="mt-2 text-sm text-accent">{project.research.status}</p>
                    </div>
                    <div className="bg-surface/35 px-5 py-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                        Role
                      </p>
                      <p className="mt-2 text-sm text-text-primary">{project.research.role}</p>
                    </div>
                  </div>

                  <div className="px-5 py-7 sm:px-7 sm:py-8">
                    <h3 className="text-xl font-semibold leading-8 tracking-[-0.02em] text-text-primary sm:text-2xl">
                      {project.research.title}
                    </h3>
                    <p className="mt-5 leading-8 text-text-muted">{project.research.summary}</p>

                    <div className={`mt-8 grid gap-px bg-border ${project.research.deliverables?.length ? 'lg:grid-cols-2' : ''}`}>
                      <div className="bg-bg px-5 py-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                          Research questions
                        </p>
                        <ol className="mt-4 space-y-3">
                          {project.research.questions.map((question, index) => (
                            <li key={question} className="grid grid-cols-[26px_1fr] gap-2 text-sm leading-7 text-text-muted">
                              <span className="font-mono text-[10px] text-text-dim">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span>{question}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {project.research.deliverables?.length ? (
                        <div className="bg-bg px-5 py-5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-status-green">
                            Planned outputs
                          </p>
                          <ul className="mt-4 space-y-3">
                            {project.research.deliverables.map((deliverable) => (
                              <li key={deliverable} className="border-l border-border pl-4 text-sm leading-7 text-text-muted">
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>

                    <p className="mt-7 border-l border-status-amber/70 pl-4 text-xs leading-6 text-text-dim">
                      <span className="text-status-amber">阶段边界：</span>
                      {project.research.boundary}
                    </p>
                  </div>
                </div>
              </DetailSection>
            ) : null}

            {project.upstream ? (
              <DetailSection index={sectionIndex('upstream')} label="Upstream" title="上游与个人边界">
                <p className="border-l-2 border-accent pl-5 leading-8 text-text-muted">{project.upstream}</p>
              </DetailSection>
            ) : null}

            {project.boundaries && project.boundaries.length > 0 ? (
              <DetailSection index={sectionIndex('scope')} label="Scope" title="边界与说明" tone="warning">
                <ul className="divide-y divide-status-amber/15 border-y border-status-amber/25">
                  {project.boundaries.map((boundary) => (
                    <li key={boundary} className="py-4 text-sm leading-7 text-text-muted">{boundary}</li>
                  ))}
                </ul>
              </DetailSection>
            ) : null}

            <DetailSection index={sectionIndex('stack')} label="Stack" title="技术栈">
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
              <DetailSection index={sectionIndex('roadmap')} label="Roadmap" title="路线进展">
                <RoadmapStrip items={project.roadmap} />
              </DetailSection>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
