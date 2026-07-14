import { motion } from 'framer-motion'
import { skills, stackHighlights } from '../../data/skills'
import { sectionItemVariants, sectionRevealVariants } from '../../utils/motion'
import { SectionHeading } from '../ui/SectionHeading'
import { TechBadge } from '../ui/TechBadge'

function getNoteClassName(note?: string): string {
  if (!note) return 'text-text-dim'
  if (note.includes('规划中')) return 'text-status-amber'
  if (note.includes('有项目实践')) return 'text-accent'
  return 'text-status-green'
}

export function SkillsSection() {
  return (
    <section id="skills" className="ambient-section border-b border-border">
      <div className="site-frame section-pad frame-pad">
        <SectionHeading
          eyebrow="01 / Capabilities"
          title="从系统、设备到控制，把技术放回工程上下文。"
          description="语言、框架、协议与工具按实际使用场景归类，熟悉程度与项目实践分别标注。"
        />

        <motion.div
          className="stack-marquee mb-10 border-y border-border bg-surface/20 py-5 sm:mb-12"
          role="region"
          aria-label="代表性技术栈滚动展示，聚焦或悬停可暂停"
          tabIndex={0}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-72px' }}
          transition={{ duration: 0.48, ease: 'easeOut' }}
        >
          <div className="stack-marquee-track">
            <ul className="flex shrink-0 gap-2.5 pr-2.5">
              {stackHighlights.map((technology) => (
                <li key={technology}>
                  <TechBadge name={technology} variant="icon" />
                </li>
              ))}
            </ul>
            <ul className="stack-marquee-copy flex shrink-0 gap-2.5 pr-2.5" aria-hidden="true">
              {stackHighlights.map((technology) => (
                <li key={technology}>
                  <TechBadge name={technology} variant="icon" />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="grid border-y border-border md:grid-cols-2 xl:grid-cols-4"
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-72px' }}
        >
          {skills.map((skill, index) => (
            <motion.article
              key={skill.domain}
              className={`px-1 py-8 sm:px-6 xl:px-7 ${index < skills.length - 1 ? 'border-b border-border md:border-b-0 md:odd:border-r xl:border-r' : ''} ${index === 1 ? 'md:border-r-0 xl:border-r' : ''} ${index === 2 ? 'md:border-r' : ''}`}
              variants={sectionItemVariants}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
                    {skill.domain}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{skill.domainLabel}</h3>
                </div>
                <span className="font-display text-3xl italic text-accent/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <ul className="mt-7 divide-y divide-border/70">
                {skill.items.map((item) => (
                  <li key={item.name} className="py-3">
                    <p className="text-sm text-text-primary">{item.name}</p>
                    {item.note ? (
                      <p className={`mt-1 text-[11px] leading-5 ${getNoteClassName(item.note)}`}>
                        {item.note}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
