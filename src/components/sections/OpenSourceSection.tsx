import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { contributions } from '../../data/openSource'
import { sectionItemVariants, sectionRevealVariants } from '../../utils/motion'
import { SectionBackdrop } from '../ui/SectionBackdrop'
import { SectionHeading } from '../ui/SectionHeading'

export function OpenSourceSection() {
  return (
    <section id="opensource" className="ambient-section ambient-section-opensource border-b border-border">
      <SectionBackdrop variant="opensource" />
      <div className="site-frame section-pad frame-pad">
        <SectionHeading
          eyebrow="03 / Open source"
          title="上游合并记录，比自我评价更有说服力。"
          description="每条贡献都可直接进入公开 PR，查看问题复现、修改范围、测试与审查过程。"
        />

        <motion.div
          className="border-y border-border"
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-72px' }}
        >
          {contributions.map((contribution) => (
            <motion.a
              key={`${contribution.repo}-${contribution.prNumber}`}
              href={contribution.url}
              target="_blank"
              rel="noreferrer"
              className="group relative grid gap-4 overflow-hidden border-b border-border px-1 py-6 transition-colors last:border-b-0 hover:bg-surface/70 focus-visible:bg-surface/70 sm:px-5 lg:grid-cols-[72px_1fr_1.7fr_24px] lg:items-center"
              variants={sectionItemVariants}
            >
              <span
                className="absolute inset-y-0 left-0 w-px origin-bottom scale-y-0 bg-accent transition-transform duration-200 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                aria-hidden="true"
              />
              <span className="font-display text-3xl italic text-accent/75 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1">
                {String(contribution.index).padStart(2, '0')}
              </span>
              <div>
                <p className="font-mono text-[10px] text-text-dim">{contribution.repo}</p>
                <h3 className="mt-1 text-lg font-semibold">
                  {contribution.project} <span className="text-accent">{contribution.prNumber}</span>
                </h3>
              </div>
              <div>
                <p className="text-sm leading-6 text-text-muted">{contribution.summary}</p>
                <p className="mt-2 line-clamp-2 font-mono text-[10px] leading-5 text-text-dim">
                  {contribution.value.join(' / ')}
                </p>
              </div>
              <ArrowUpRight
                className="text-text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                size={18}
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
