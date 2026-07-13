import { useEffect } from 'react'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { projects } from '../data/projects'

const featuredProjectCount = projects.filter((project) => project.featured).length

export function ProjectsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <section className="border-b border-border pt-16">
        <div className="site-frame frame-pad py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
            <div>
              <p className="eyebrow">Project archive / {String(projects.length).padStart(2, '0')} cases</p>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.05em] sm:text-7xl">
                从摘要进入代码、测试、指标与工程边界。
              </h1>
            </div>
            <div className="border-l border-border pl-6">
              <p className="text-sm leading-7 text-text-muted">
                这里持续收录完整项目、实验原型与独立工具。可按主题快速筛选，再进入详情查看实现、验证记录和工作边界。
              </p>
              <dl className="mt-6 grid grid-cols-2 border-y border-border py-4 font-mono">
                <div>
                  <dt className="text-[10px] text-text-dim">PROJECTS</dt>
                  <dd className="mt-1 text-xl text-accent">{projects.length}</dd>
                </div>
                <div className="border-l border-border pl-5">
                  <dt className="text-[10px] text-text-dim">FEATURED</dt>
                  <dd className="mt-1 text-xl text-accent">{featuredProjectCount}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <ProjectsSection />
    </>
  )
}
