import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { resumes } from '../../data/resumes'
import { getAssetUrl } from '../../utils/assets'
import { sectionItemVariants, sectionRevealVariants } from '../../utils/motion'
import { SectionHeading } from '../ui/SectionHeading'

export function ResumesSection() {
  return (
    <section id="resumes" className="ambient-section ambient-section-center border-b border-border bg-accent-dim/10">
      <div className="site-frame section-pad frame-pad">
        <SectionHeading
          eyebrow="04 / Resume routes"
          title="按岗位方向，快速进入最相关的经历与项目证据。"
          description="系统后端、嵌入式与机器人软件分别整理阅读重点，可直接下载对应版本。"
        />

        <motion.div
          className="grid border-y border-border lg:grid-cols-3"
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-72px' }}
        >
          {resumes.map((resume, index) => (
            <motion.article
              key={resume.slug}
              className={`group/resume relative flex min-h-[380px] flex-col overflow-hidden px-1 py-8 transition-colors hover:bg-surface/30 focus-within:bg-surface/30 sm:px-7 lg:px-8 ${index < resumes.length - 1 ? 'border-b border-border lg:border-b-0 lg:border-r' : ''}`}
              variants={sectionItemVariants}
            >
              <span
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover/resume:scale-x-100 group-focus-within/resume:scale-x-100"
                aria-hidden="true"
              />
              <span className="font-display text-4xl italic text-accent/75">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{resume.direction}</h3>
              <p className="mt-4 text-sm leading-7 text-text-muted">{resume.description}</p>
              <ul className="mt-6 space-y-2 border-t border-border/70 pt-5">
                {resume.highlights.map((highlight) => (
                  <li key={highlight} className="text-xs leading-5 text-text-dim">{highlight}</li>
                ))}
              </ul>

              <a
                href={getAssetUrl(`assets/resumes/${encodeURI(resume.filename)}`)}
                download={resume.filename}
                className="button-quiet mt-8 w-full lg:mt-auto"
              >
                <Download className="transition-transform duration-200 group-hover/resume:translate-y-0.5" size={16} aria-hidden="true" />
                下载 PDF
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
