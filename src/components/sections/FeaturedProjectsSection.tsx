import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { ProjectStatusBadge } from '../project/ProjectStatusBadge'
import { ProjectVisual } from '../project/ProjectVisual'
import { EvidenceBadge } from '../project/EvidenceBadge'
import { SectionHeading } from '../ui/SectionHeading'

const featuredProjects = projects.filter((project) => project.featured)

export function FeaturedProjectsSection() {
  return (
    <section id="featured-projects" className="border-b border-border">
      <div className="site-frame section-pad">
        <div className="frame-pad">
          <SectionHeading
            eyebrow="02 / Selected work"
            title="从问题定义、实现取舍到验证结果。"
            description="这里展示当前最能代表工程过程的作品；每个项目都保留可继续追问的实现细节、验证记录与边界说明。"
            action={
              <Link to="/projects" className="text-link">
                浏览全部项目 <ArrowRight size={15} aria-hidden="true" />
              </Link>
            }
          />
        </div>

        <div className="border-y border-border">
          {featuredProjects.map((project, index) => {
            const textOnRight = index % 2 === 1

            return (
              <motion.article
                key={project.slug}
                className="group relative grid overflow-hidden border-b border-border last:border-b-0 lg:min-h-[610px] lg:block"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ProjectVisual
                  media={project.cover}
                  objectPosition={textOnRight ? 'left center' : 'right center'}
                  className="h-72 w-full lg:absolute lg:inset-0 lg:h-full"
                  imageClassName="transition-transform duration-700 group-hover:scale-[1.015]"
                  sizes="(max-width: 1024px) 100vw, 1240px"
                />

                <div className={`relative z-10 flex min-h-full ${textOnRight ? 'lg:justify-end' : 'lg:justify-start'}`}>
                  <div
                    className={`flex w-full flex-col justify-center bg-bg/95 px-5 py-9 sm:px-8 sm:py-12 lg:w-[62%] lg:bg-transparent lg:px-12 lg:py-16 ${
                      textOnRight
                        ? 'lg:bg-[linear-gradient(270deg,rgba(9,10,13,0.86)_0%,rgba(9,10,13,0.82)_68%,rgba(9,10,13,0.72)_88%,rgba(9,10,13,0)_100%)] lg:pl-24'
                        : 'lg:bg-[linear-gradient(90deg,rgba(9,10,13,0.86)_0%,rgba(9,10,13,0.82)_68%,rgba(9,10,13,0.72)_88%,rgba(9,10,13,0)_100%)] lg:pr-24'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-3xl italic text-accent/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="mx-1 h-px w-8 bg-border" aria-hidden="true" />
                      <ProjectStatusBadge status={project.status} />
                      <EvidenceBadge level={project.evidence.level} />
                    </div>

                    <p className="mt-7 font-mono text-[11px] text-text-dim lg:text-text-primary/55">
                      {project.period} / {project.role}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-base font-medium text-accent sm:text-lg">{project.subtitle}</p>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-text-muted sm:text-base sm:leading-8 lg:text-text-primary/80">
                      {project.summary}
                    </p>

                    <ul className="mt-6 max-w-xl space-y-3">
                      {project.highlights.slice(0, 3).map((highlight) => (
                        <li key={highlight} className="border-l border-border pl-4 text-sm leading-6 text-text-muted lg:border-white/15 lg:text-text-primary/75">
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-7 flex flex-wrap border-y border-border/80">
                      {project.metrics.slice(0, 2).map((metric) => (
                        <div key={`${metric.value}-${metric.unit}`} className="min-w-[150px] flex-1 py-4 pr-5 first:border-r first:border-border">
                          <dt className="font-mono text-xl text-accent">{metric.value}</dt>
                          <dd className="mt-1 text-[11px] text-text-dim lg:text-text-primary/55">{metric.unit} · {metric.description}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                      <Link to={`/projects/${project.slug}`} className="text-link">
                        打开项目案例 <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                      {project.cover.caption ? (
                        <span className="max-w-xs text-right font-mono text-[10px] leading-4 text-text-dim">
                          {project.cover.caption}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
