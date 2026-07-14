import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { sectionItemVariants } from '../../utils/motion'
import { ProjectStatusBadge } from '../project/ProjectStatusBadge'
import { ProjectVisual } from '../project/ProjectVisual'
import { EvidenceBadge } from '../project/EvidenceBadge'
import { SectionHeading } from '../ui/SectionHeading'

const featuredProjects = projects.filter((project) => project.featured)

const projectArticleVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.07,
    },
  },
}

const projectMediaVariants: Variants = {
  hidden: { opacity: 0.72, scale: 1.025 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.82, ease: 'easeOut' },
  },
}

const projectCopyVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.065,
    },
  },
}

export function FeaturedProjectsSection() {
  return (
    <section id="featured-projects" className="border-b border-border bg-bg">
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
                variants={projectArticleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div
                  className="h-72 w-full will-change-transform lg:absolute lg:inset-0 lg:h-full"
                  variants={projectMediaVariants}
                >
                  <ProjectVisual
                    media={project.cover}
                    objectPosition={textOnRight ? 'left center' : 'right center'}
                    className="h-full w-full"
                    imageClassName="transition-transform duration-700 group-hover:scale-[1.015]"
                    sizes="(max-width: 1024px) 100vw, 1240px"
                  />
                </motion.div>

                <div className={`relative z-10 flex min-h-full ${textOnRight ? 'lg:justify-end' : 'lg:justify-start'}`}>
                  <motion.div
                    className={`flex w-full flex-col justify-center bg-bg/95 px-5 py-9 sm:px-8 sm:py-12 lg:w-[62%] lg:bg-transparent lg:px-12 lg:py-16 ${
                      textOnRight
                        ? 'lg:bg-[linear-gradient(270deg,rgba(9,10,13,0.86)_0%,rgba(9,10,13,0.82)_68%,rgba(9,10,13,0.72)_88%,rgba(9,10,13,0)_100%)] lg:pl-24'
                        : 'lg:bg-[linear-gradient(90deg,rgba(9,10,13,0.86)_0%,rgba(9,10,13,0.82)_68%,rgba(9,10,13,0.72)_88%,rgba(9,10,13,0)_100%)] lg:pr-24'
                    }`}
                    variants={projectCopyVariants}
                  >
                    <motion.div className="flex flex-wrap items-center gap-2" variants={sectionItemVariants}>
                      <span className="font-display text-3xl italic text-accent/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="mx-1 h-px w-8 bg-border" aria-hidden="true" />
                      <ProjectStatusBadge status={project.status} />
                      <EvidenceBadge level={project.evidence.level} />
                    </motion.div>

                    <motion.p className="mt-7 font-mono text-[11px] text-text-dim lg:text-text-primary/55" variants={sectionItemVariants}>
                      {project.period} / {project.role}
                    </motion.p>
                    <motion.h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl" variants={sectionItemVariants}>
                      {project.title}
                    </motion.h3>
                    <motion.p className="mt-3 text-base font-medium text-accent sm:text-lg" variants={sectionItemVariants}>
                      {project.subtitle}
                    </motion.p>
                    <motion.p className="mt-5 max-w-xl text-sm leading-7 text-text-muted sm:text-base sm:leading-8 lg:text-text-primary/80" variants={sectionItemVariants}>
                      {project.summary}
                    </motion.p>

                    <motion.ul className="mt-6 max-w-xl space-y-3" variants={projectCopyVariants}>
                      {project.highlights.slice(0, 3).map((highlight) => (
                        <motion.li
                          key={highlight}
                          className="border-l border-border pl-4 text-sm leading-6 text-text-muted lg:border-white/15 lg:text-text-primary/75"
                          variants={sectionItemVariants}
                        >
                          {highlight}
                        </motion.li>
                      ))}
                    </motion.ul>

                    <motion.dl className="mt-7 flex flex-wrap border-y border-border/80" variants={sectionItemVariants}>
                      {project.metrics.slice(0, 2).map((metric) => (
                        <div key={`${metric.value}-${metric.unit}`} className="min-w-[150px] flex-1 py-4 pr-5 first:border-r first:border-border">
                          <dt className="font-mono text-xl text-accent">{metric.value}</dt>
                          <dd className="mt-1 text-[11px] text-text-dim lg:text-text-primary/55">{metric.unit} · {metric.description}</dd>
                        </div>
                      ))}
                    </motion.dl>

                    <motion.div className="mt-7 flex flex-wrap items-center justify-between gap-4" variants={sectionItemVariants}>
                      <Link to={`/projects/${project.slug}`} className="text-link">
                        打开项目案例 <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                      {project.cover.caption ? (
                        <span className="max-w-xs text-right font-mono text-[10px] leading-4 text-text-dim">
                          {project.cover.caption}
                        </span>
                      ) : null}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
