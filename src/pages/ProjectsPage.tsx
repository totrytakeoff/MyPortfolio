import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { AnimatedMetricValue } from '../components/ui/AnimatedMetricValue'
import { projects } from '../data/projects'
import type { ProjectNavigationState } from '../types'
import { sectionItemVariants, sectionRevealVariants } from '../utils/motion'

const featuredProjectCount = projects.filter((project) => project.featured).length

export function ProjectsPage() {
  const location = useLocation()
  const routeState = location.state as ProjectNavigationState | null
  const restoredArchive = routeState?.restoreArchive

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: restoredArchive?.scrollY ?? 0,
        behavior: 'auto',
      })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [restoredArchive?.scrollY])

  return (
    <>
      <section className="border-b border-border pt-16">
        <div className="site-frame frame-pad py-20 sm:py-28">
          <motion.div
            className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end"
            variants={sectionRevealVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={sectionItemVariants}>
              <p className="eyebrow">Project archive / {String(projects.length).padStart(2, '0')} cases</p>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.05em] sm:text-7xl">
                从摘要进入代码、测试、指标与工程边界。
              </h1>
            </motion.div>
            <motion.div className="border-l border-border pl-6" variants={sectionItemVariants}>
              <p className="text-sm leading-7 text-text-muted">
                这里持续收录完整项目、实验原型与独立工具。可按主题快速筛选，再进入详情查看实现、验证记录和工作边界。
              </p>
              <dl className="mt-6 grid grid-cols-2 border-y border-border py-4 font-mono">
                <div>
                  <dt className="text-[10px] text-text-dim">PROJECTS</dt>
                  <dd className="mt-1 text-xl text-accent">
                    <AnimatedMetricValue value={projects.length} delay={0.12} />
                  </dd>
                </div>
                <div className="border-l border-border pl-5">
                  <dt className="text-[10px] text-text-dim">FEATURED</dt>
                  <dd className="mt-1 text-xl text-accent">
                    <AnimatedMetricValue value={featuredProjectCount} delay={0.2} />
                  </dd>
                </div>
              </dl>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <ProjectsSection initialCategory={restoredArchive?.category} />
    </>
  )
}
