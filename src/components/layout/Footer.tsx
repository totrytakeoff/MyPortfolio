import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Mail, Phone } from 'lucide-react'
import { profile } from '../../data/profile'
import { getAssetUrl } from '../../utils/assets'
import { sectionItemVariants, sectionRevealVariants } from '../../utils/motion'

export function Footer() {
  return (
    <footer id="contact" className="relative isolate overflow-hidden border-t border-border bg-[#0b0d12]">
      <img
        src={getAssetUrl('takeoff.svg')}
        alt=""
        className="pointer-events-none absolute -bottom-72 -left-48 z-0 w-[760px] max-w-none invert mix-blend-screen opacity-[0.035] sm:-bottom-96 sm:-left-56 sm:w-[980px]"
        aria-hidden="true"
      />

      <div className="site-frame relative z-10">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <motion.div
            className="frame-pad border-b border-border py-14 sm:py-20 lg:border-b-0 lg:border-r"
            variants={sectionRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-72px' }}
          >
            <motion.p className="eyebrow" variants={sectionItemVariants}>Contact / Open to internship</motion.p>
            <motion.h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl" variants={sectionItemVariants}>
              如果你正在寻找能把工程事实讲清楚、也愿意把问题做到底的实习生。
            </motion.h2>
            <motion.p className="mt-5 max-w-2xl text-sm leading-7 text-text-muted sm:text-base" variants={sectionItemVariants}>
              欢迎交流 C++ 系统、嵌入式控制与机器人软件岗位。邮件和 GitHub 都会直接到达我。
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center divide-y divide-border/80"
            variants={sectionRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-72px' }}
          >
            <motion.a
              href={`mailto:${profile.email}`}
              className="group flex min-h-16 items-center justify-between gap-4 px-5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text-primary sm:px-8"
              variants={sectionItemVariants}
            >
              <span className="inline-flex items-center gap-3"><Mail size={16} /> {profile.email}</span>
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} />
            </motion.a>
            <motion.a
              href={`tel:${profile.phone}`}
              className="group flex min-h-16 items-center justify-between gap-4 px-5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text-primary sm:px-8"
              variants={sectionItemVariants}
            >
              <span className="inline-flex items-center gap-3"><Phone size={16} /> {profile.phone}</span>
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} />
            </motion.a>
            <motion.a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-16 items-center justify-between gap-4 px-5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text-primary sm:px-8"
              variants={sectionItemVariants}
            >
              <span className="inline-flex items-center gap-3"><Github size={16} /> github.com/{profile.github}</span>
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} />
            </motion.a>
          </motion.div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border px-5 py-6 font-mono text-[11px] text-text-dim sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} {profile.name} / {profile.nameEn}</span>
          <span>Code · tests · metrics · upstream records</span>
        </div>
      </div>
    </footer>
  )
}
