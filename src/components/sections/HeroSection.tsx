import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { ProjectVisual } from '../project/ProjectVisual'
import { AnimatedMetricValue } from '../ui/AnimatedMetricValue'
import { SectionLink } from '../ui/SectionLink'

const heroMetrics = [
  { value: 714.4, fractionDigits: 1, unit: 'msg/s', label: 'MyChat WSS' },
  { value: 26, fractionDigits: 0, unit: '单测通过', label: 'SO101 控制逻辑' },
  { value: 4, fractionDigits: 0, unit: 'Merged PR', label: '上游贡献' },
  { value: 30, fractionDigits: 0, unit: '固件目标', label: 'RM2026 全量构建' },
] as const

const projectSequence = [
  ...projects.filter((project) => project.featured),
  ...projects.filter((project) => !project.featured),
]
const reelProjects = [...projectSequence, ...projectSequence]

function ProjectReel() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-20 top-20 -rotate-[3deg] opacity-95 sm:top-16 lg:left-[34%] lg:top-10 lg:opacity-100">
        <div className="project-reel-forward gap-5 pr-5">
          {reelProjects.map((project, index) => (
            <ProjectVisual
              key={`top-${project.slug}-${index}`}
              media={project.cover}
              loading={index < 3 ? 'eager' : 'lazy'}
              className="h-48 w-[300px] shrink-0 border border-border/80 sm:h-56 sm:w-[360px] lg:h-64 lg:w-[410px]"
              imageClassName="opacity-100 saturate-[0.9] contrast-[1.04] lg:saturate-100 lg:contrast-105"
            />
          ))}
        </div>
      </div>

      <div className="absolute -left-40 top-[52%] rotate-[2deg] opacity-80 lg:left-[44%] lg:top-[50%] lg:opacity-90">
        <div className="project-reel-reverse gap-5 pr-5">
          {reelProjects.map((project, index) => (
            <ProjectVisual
              key={`bottom-${project.slug}-${index}`}
              media={project.cover}
              className="h-40 w-[260px] shrink-0 border border-border/80 sm:h-48 sm:w-[320px] lg:h-56 lg:w-[360px]"
              imageClassName="opacity-95 saturate-[0.85] contrast-[1.03] lg:opacity-100 lg:saturate-100 lg:contrast-105"
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#090a0d_0%,rgba(9,10,13,0.94)_28%,rgba(9,10,13,0.5)_55%,rgba(9,10,13,0.04)_100%)] lg:bg-[linear-gradient(90deg,#090a0d_0%,rgba(9,10,13,0.9)_26%,rgba(9,10,13,0.32)_52%,rgba(9,10,13,0)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,13,0.14)_0%,rgba(9,10,13,0.06)_58%,rgba(9,10,13,0.82)_100%)] lg:bg-[linear-gradient(180deg,rgba(9,10,13,0.06)_0%,rgba(9,10,13,0.02)_58%,rgba(9,10,13,0.68)_100%)]" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="top" className="border-b border-border pt-16">
      <div className="site-frame relative min-h-[860px] overflow-hidden lg:min-h-[calc(100svh-4rem)]">
        <ProjectReel />

        <div className="relative z-10 flex min-h-[700px] flex-col justify-center px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:min-h-[720px] lg:px-12 lg:pt-24">
          <div className="max-w-3xl">
            <motion.div
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <span className="eyebrow">Engineering Portfolio / 2028</span>
              <span className="font-mono text-[11px] text-text-dim">{profile.nameEn} / {profile.school}</span>
            </motion.div>

            <motion.h1
              className="mt-7 text-balance text-[46px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-7xl lg:text-[82px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6, ease: 'easeOut' }}
            >
              {profile.name}
              <span className="mt-2 block font-display text-[0.72em] font-normal italic tracking-[-0.025em] text-accent">
                Systems, devices, motion.
              </span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-2xl text-lg font-medium leading-8 text-text-primary sm:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.55, ease: 'easeOut' }}
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              className="mt-4 max-w-2xl text-sm leading-7 text-text-muted sm:text-base sm:leading-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.55, ease: 'easeOut' }}
            >
              {profile.summary}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.55, ease: 'easeOut' }}
            >
              <Link to="/projects" className="button-primary">
                完整项目档案
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="button-secondary">
                <Github size={16} aria-hidden="true" />
                GitHub
              </a>
              <SectionLink sectionId="resumes" className="button-quiet">
                <Download size={16} aria-hidden="true" />
                选择简历
              </SectionLink>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-text-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.5 }}
            >
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-accent">
                <Mail size={13} aria-hidden="true" /> {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-accent">
                <Phone size={13} aria-hidden="true" /> {profile.phone}
              </a>
            </motion.div>
          </div>
        </div>

        <motion.dl
          className="relative z-10 grid grid-cols-2 border-t border-border bg-bg/80 backdrop-blur-md lg:grid-cols-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.55, ease: 'easeOut' }}
        >
          {heroMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`min-h-28 px-5 py-5 sm:px-8 ${index % 2 === 0 ? 'border-r border-border' : ''} ${index < 2 ? 'border-b border-border lg:border-b-0' : ''} ${index > 0 ? 'lg:border-l lg:border-border' : ''}`}
            >
              <dt className="text-xs text-text-dim">{metric.label}</dt>
              <dd className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-2xl tabular-nums text-accent">
                  <AnimatedMetricValue
                    value={metric.value}
                    fractionDigits={metric.fractionDigits}
                    delay={0.46 + index * 0.09}
                  />
                </span>
                <span className="font-mono text-[10px] text-text-muted">{metric.unit}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
